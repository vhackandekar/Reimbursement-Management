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
        await initiateApprovalProcess(expenseId, userId, companyId, convertedAmount);
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

async function initiateApprovalProcess(expenseId, userId, companyId, amount) {
    // 1. Check for Active Rules
    const [rules] = await pool.execute('SELECT * FROM ApprovalRules WHERE company_id = ? AND is_active = TRUE', [companyId]);
    
    // 2. Get Employee's Manager
    const [userRows] = await pool.execute('SELECT manager_id FROM Users WHERE id = ?', [userId]);
    const managerId = userRows[0].manager_id;

    if (rules.length > 0) {
        // Find if an amount rule exists
        const amountRule = rules.find(r => r.rule_type === 'conditional' && (typeof r.config === 'string' ? JSON.parse(r.config).amountThreshold : r.config.amountThreshold));
        let rule = rules[0]; // fallback
        
        if (amountRule) {
            const config = typeof amountRule.config === 'string' ? JSON.parse(amountRule.config) : amountRule.config;
            if (amount > config.amountThreshold) rule = amountRule;
        }

        const config = typeof rule.config === 'string' ? JSON.parse(rule.config) : rule.config;

        // Amount-Based Rule Logic (Multi-level)
        if (rule.rule_type === 'conditional' && config.amountThreshold && amount > config.amountThreshold) {
             let sequence = config.approvers && config.approvers.length > 0 ? config.approvers : [];
             if (sequence.length === 0) {
                 if (managerId) sequence.push(managerId);
                 if (config.specificApproverId) sequence.push(config.specificApproverId);
             }
             
             if (sequence.length > 0) {
                 for (let i = 0; i < sequence.length; i++) {
                     const status = (i === 0) ? 'pending' : 'waiting';
                     await pool.execute('INSERT INTO Approvals (expense_id, user_id, step_number, status) VALUES (?, ?, ?, ?)',
                         [expenseId, sequence[i], i + 1, status]);
                     if (status === 'pending') {
                         sendNotification(sequence[i], { message: 'New expense pending your approval', expenseId });
                     }
                 }
                 return;
             }
        } else if (rule.rule_type === 'conditional' || rule.rule_type === 'parallel') {
             // Parallel: All are pending immediately
             const approvers = new Set();
             if (managerId) approvers.add(managerId);
             if (config.specificApproverId) approvers.add(config.specificApproverId);

             for (const approverId of approvers) {
                 await pool.execute('INSERT INTO Approvals (expense_id, user_id, status) VALUES (?, ?, ?)', [expenseId, approverId, 'pending']);
                 sendNotification(approverId, { message: 'New expense pending your approval', expenseId });
             }
             return;
        } else if (rule.rule_type === 'sequential') {
            // Sequence of approvers from config?
            if (config.approvers && config.approvers.length > 0) {
                for (let i = 0; i < config.approvers.length; i++) {
                    const status = (i === 0) ? 'pending' : 'waiting';
                    await pool.execute('INSERT INTO Approvals (expense_id, user_id, step_number, status) VALUES (?, ?, ?, ?)',
                        [expenseId, config.approvers[i], i + 1, status]);
                    if (status === 'pending') {
                        sendNotification(config.approvers[i], { message: 'New expense pending your approval', expenseId });
                    }
                }
                return;
            }
        }
    }

    // Default: Manager First (Step 1)
    if (managerId) {
        await pool.execute(
            'INSERT INTO Approvals (expense_id, user_id, step_number, status) VALUES (?, ?, ?, ?)',
            [expenseId, managerId, 1, 'pending']
        );
        sendNotification(managerId, { message: 'New expense pending your approval', expenseId });
    } else {
        await pool.execute('UPDATE Expenses SET status = ? WHERE id = ?', ['approved', expenseId]);
    }
}

module.exports = { createExpense, getUserExpenses, getAllCompanyExpenses };
