const pool = require('../config/db');
const { sendNotification } = require('../utils/socket');

const getPendingApprovals = async (userId) => {
    const [rows] = await pool.execute(
        `SELECT a.*, e.amount, e.currency, e.category, e.description, u.name as employee_name
         FROM Approvals a
         JOIN Expenses e ON a.expense_id = e.id
         JOIN Users u ON e.user_id = u.id
         WHERE a.user_id = ? AND a.status = 'pending'`,
        [userId]
    );
    return rows;
};

const approveExpense = async (approvalId, userId, comments) => {
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        // 1. Update the current approval record
        const [approvalResult] = await connection.execute(
            'UPDATE Approvals SET status = ?, comments = ? WHERE id = ? AND user_id = ?',
            ['approved', comments, approvalId, userId]
        );

        if (approvalResult.affectedRows === 0) throw new Error('Approval not found or already processed');

        // 2. Get Expense ID and Company ID
        const [[approval]] = await connection.execute('SELECT expense_id FROM Approvals WHERE id = ?', [approvalId]);
        const [[expense]] = await connection.execute('SELECT user_id, status FROM Expenses WHERE id = ?', [approval.expense_id]);
        const [[user]] = await connection.execute('SELECT company_id, manager_id FROM Users WHERE id = ?', [expense.user_id]);

        // 3. Logic: Check for next steps or rules
        const [[approver]] = await connection.execute('SELECT role FROM Users WHERE id = ?', [userId]);

        if (approver.role === 'Admin') {
            // Rule 2: Admin Override Rule
            await connection.execute('UPDATE Expenses SET status = "approved" WHERE id = ?', [approval.expense_id]);
            // Also mark any other waiting/pending approvals as 'approved' or just leave them?
            // Usually, we should probably mark them as 'approved' or 'cancelled' to clean up.
            // For now, let's just mark the main expense as approved.
            await connection.execute('UPDATE Approvals SET status = "approved" WHERE expense_id = ? AND status IN ("pending", "waiting")', [approval.expense_id]);
            
            sendNotification(expense.user_id, { message: 'Your expense has been approved by Admin!', expenseId: approval.expense_id });
        } else {
            // Default/Sequential Layer
            // Find the current step number
            const [[currentApproval]] = await connection.execute('SELECT step_number FROM Approvals WHERE id = ?', [approvalId]);
            const nextStep = currentApproval.step_number + 1;

            // Activate next person in sequence
            const [next] = await connection.execute(
                'UPDATE Approvals SET status = "pending" WHERE expense_id = ? AND step_number = ? AND status = "waiting"',
                [approval.expense_id, nextStep]
            );

            if (next.affectedRows > 0) {
                // Find who the next person is to notify them
                const [[nextApprover]] = await connection.execute(
                    'SELECT user_id FROM Approvals WHERE expense_id = ? AND step_number = ?',
                    [approval.expense_id, nextStep]
                );
                sendNotification(nextApprover.user_id, { message: 'Expense pending your approval', expenseId: approval.expense_id });
            } else {
                // No more waiting steps -> All done!
                const [remainingPending] = await connection.execute(
                    'SELECT id FROM Approvals WHERE expense_id = ? AND status IN ("pending", "waiting")',
                    [approval.expense_id]
                );
                if (remainingPending.length === 0) {
                    await connection.execute('UPDATE Expenses SET status = "approved" WHERE id = ?', [approval.expense_id]);
                    sendNotification(expense.user_id, { message: 'Your expense has been approved!', expenseId: approval.expense_id });
                }
            }
        }

        await connection.commit();
        return { message: 'Approved successfully' };
    } catch (error) {
        await connection.rollback();
        throw error;
    } finally {
        connection.release();
    }
};

const rejectExpense = async (approvalId, userId, comments) => {
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        // 1. Update the current approval record
        await connection.execute(
            'UPDATE Approvals SET status = ?, comments = ? WHERE id = ? AND user_id = ?',
            ['rejected', comments, approvalId, userId]
        );

        // 2. If rejected, the whole expense is rejected immediately
        const [[approval]] = await connection.execute('SELECT expense_id FROM Approvals WHERE id = ?', [approvalId]);
        const [[expense]] = await connection.execute('SELECT user_id FROM Expenses WHERE id = ?', [approval.expense_id]);
        await connection.execute('UPDATE Expenses SET status = "rejected" WHERE id = ?', [approval.expense_id]);
        sendNotification(expense.user_id, { message: 'Your expense has been rejected.', expenseId: approval.expense_id, comments });

        await connection.commit();
        return { message: 'Rejected successfully' };
    } catch (error) {
        await connection.rollback();
        throw error;
    } finally {
        connection.release();
    }
};

async function handleConditionalApproval(connection, expenseId, rule) {
    const config = typeof rule.config === 'string' ? JSON.parse(rule.config) : rule.config;
    // allApprovals: [{status, user_id}]
    const [allApprovals] = await connection.execute('SELECT status, user_id FROM Approvals WHERE expense_id = ?', [expenseId]);

    const approvedCount = allApprovals.filter(a => a.status === 'approved').length;
    const totalCount = allApprovals.length;
    
    // Check if any "Required" approver has not approved yet
    const requiredApproverIds = config.requiredApprovers || []; // Array of User IDs
    const allRequiredApproved = requiredApproverIds.every(reqId => 
        allApprovals.some(a => a.user_id === reqId && a.status === 'approved')
    );

    let isFullyApproved = false;

    if (config.rule === 'percentage') {
        const percentage = (approvedCount / totalCount) * 100;
        if (percentage >= config.minPercentage) isFullyApproved = true;
    } else if (config.rule === 'specific_approver') {
        const adminApproval = allApprovals.find(a => a.user_id === config.specificApproverId && a.status === 'approved');
        if (adminApproval) isFullyApproved = true;
    } else if (config.rule === 'hybrid') {
        const percentage = (approvedCount / totalCount) * 100;
        const adminApproval = allApprovals.find(a => a.user_id === config.specificApproverId && a.status === 'approved');
        if (percentage >= config.minPercentage || adminApproval) isFullyApproved = true;
    }

    // OVERRIDE: If required people haven't approved, it cannot be fully approved
    if (requiredApproverIds.length > 0 && !allRequiredApproved) {
        isFullyApproved = false;
    }

    if (isFullyApproved) {
        const [[expense]] = await connection.execute('SELECT user_id FROM Expenses WHERE id = ?', [expenseId]);
        await connection.execute('UPDATE Expenses SET status = "approved" WHERE id = ?', [expenseId]);
        sendNotification(expense.user_id, { message: 'Your expense has been approved!', expenseId });
    }
}

module.exports = { getPendingApprovals, approveExpense, rejectExpense };
