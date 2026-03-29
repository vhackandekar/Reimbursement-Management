const pool = require('../config/db');
const { getExchangeRate } = require('../utils/apiClient');
const { sendNotification } = require('../utils/socket');

const createExpense = async (userId, companyId, data, receiptUrl) => {
    const { amount, currency, category, description, date, status = 'draft' } = data;

    // Get Company Currency
    const [companyResult] = await pool.execute('SELECT currency FROM Companies WHERE id = ?', [companyId]);
    const companyCurrency = companyResult[0].currency;

    // Convert Amount
    const exchangeRate = await getExchangeRate(currency, companyCurrency);
    const convertedAmount = amount * exchangeRate;

    // Save Expense
    const [result] = await pool.execute(
        `INSERT INTO Expenses (user_id, amount, currency, converted_amount, company_currency, category, description, date, paid_by, receipt_url, status)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [userId, amount, currency, convertedAmount, companyCurrency, category, description, date, 'Employee', receiptUrl, status]
    );

    const expenseId = result.insertId;

    if (status === 'pending') {
        await initiateApprovalProcess(expenseId, userId, companyId);
    }

    return { id: expenseId, status, message: 'Expense saved' };
};

const getUserExpenses = async (userId, status) => {
    let query = 'SELECT * FROM Expenses WHERE user_id = ?';
    let params = [userId];
    if (status) {
        query += ' AND status = ?';
        params.push(status);
    }
    const [rows] = await pool.execute(query, params);
    return rows;
};

const getAllCompanyExpenses = async (companyId, role, userId, status) => {
    let query = 'SELECT e.* FROM Expenses e JOIN Users u ON e.user_id = u.id WHERE u.company_id = ?';
    let params = [companyId];

    if (role === 'Employee') {
        query += ' AND e.user_id = ?';
        params.push(userId);
    } else if (role === 'Manager') {
        query += ' AND (u.manager_id = ? OR e.user_id = ?)';
        params.push(userId, userId);
    }

    if (status) {
        query += ' AND e.status = ?';
        params.push(status);
    }

    const [rows] = await pool.execute(query, params);
    return rows;
};

async function initiateApprovalProcess(expenseId, userId, companyId) {
    // Get Expense details to check the amount
    const [expenseRows] = await pool.execute('SELECT converted_amount FROM Expenses WHERE id = ?', [expenseId]);
    const amount = expenseRows[0].converted_amount;

    // 1. Get Employee's Manager
    const [userRows] = await pool.execute('SELECT manager_id FROM Users WHERE id = ?', [userId]);
    const managerId = userRows[0].manager_id;

    // 2. Get an Admin for the company (needed for amount > 5000, excluding the submitter)
    const [adminRows] = await pool.execute('SELECT id FROM Users WHERE company_id = ? AND role = "Admin" AND id != ? LIMIT 1', [companyId, userId]);
    const adminId = adminRows.length > 0 ? adminRows[0].id : null;

    if (amount <= 5000) {
        // Rule 1: Amount <= 5000 -> Only Manager approval required
        if (managerId && managerId !== userId) {
            await pool.execute(
                'INSERT INTO Approvals (expense_id, user_id, step_number, status) VALUES (?, ?, ?, ?)',
                [expenseId, managerId, 1, 'pending']
            );
            sendNotification(managerId, { message: 'New expense pending your approval', expenseId });
        } else if (adminId) {
            // Fallback to Admin if no Manager assigned or user is their own manager
            await pool.execute(
                'INSERT INTO Approvals (expense_id, user_id, step_number, status) VALUES (?, ?, ?, ?)',
                [expenseId, adminId, 1, 'pending']
            );
            sendNotification(adminId, { message: 'New expense pending your approval', expenseId });
        } else {
            // No other approvers found (e.g., user is the only Manager/Admin)
            await pool.execute('UPDATE Expenses SET status = ? WHERE id = ?', ['approved', expenseId]);
            sendNotification(userId, { message: 'Your expense has been auto-approved as no other approvers were found.', expenseId });
        }
    } else {
        // Rule 1: Amount > 5000 -> Sequential: Manager then Admin
        let step = 1;
        let approverAdded = false;

        if (managerId && managerId !== userId) {
            await pool.execute(
                'INSERT INTO Approvals (expense_id, user_id, step_number, status) VALUES (?, ?, ?, ?)',
                [expenseId, managerId, step++, 'pending']
            );
            sendNotification(managerId, { message: 'New expense pending your approval', expenseId });
            approverAdded = true;
        }

        if (adminId) {
            // Step 2 (Admin) is waiting if Manager exists, otherwise pending
            const status = (approverAdded) ? 'waiting' : 'pending';
            await pool.execute(
                'INSERT INTO Approvals (expense_id, user_id, step_number, status) VALUES (?, ?, ?, ?)',
                [expenseId, adminId, step++, status]
            );
            if (status === 'pending') {
                sendNotification(adminId, { message: 'New expense pending your approval', expenseId });
            }
            approverAdded = true;
        }

        if (!approverAdded) {
            // No other approvers found
            await pool.execute('UPDATE Expenses SET status = ? WHERE id = ?', ['approved', expenseId]);
            sendNotification(userId, { message: 'Your expense has been auto-approved as no other approvers were found.', expenseId });
        }
    }
}

module.exports = { createExpense, getUserExpenses, getAllCompanyExpenses };
