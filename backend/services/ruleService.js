const pool = require('../config/db');

const createRule = async (companyId, name, ruleType, config) => {
    const [result] = await pool.execute(
        'INSERT INTO ApprovalRules (company_id, name, rule_type, config) VALUES (?, ?, ?, ?)',
        [companyId, name, ruleType, JSON.stringify(config)]
    );
    return { id: result.insertId, name, ruleType, config };
};

const getRules = async (companyId) => {
    const [rows] = await pool.execute('SELECT * FROM ApprovalRules WHERE company_id = ?', [companyId]);
    return rows;
};

module.exports = { createRule, getRules };
