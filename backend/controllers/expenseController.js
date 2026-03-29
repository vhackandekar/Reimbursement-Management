const expenseService = require('../services/expenseService');

const createExpense = async (req, res) => {
    try {
        const { id: userId, company_id } = req.user;
        const receiptUrl = req.file ? `/uploads/${req.file.filename}` : null;
        const result = await expenseService.createExpense(userId, company_id, req.body, receiptUrl);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getMyExpenses = async (req, res) => {
    try {
        const { id: userId } = req.user;
        const { status } = req.query;
        const result = await expenseService.getUserExpenses(userId, status);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getAllExpenses = async (req, res) => {
    try {
        const { company_id, role, id: userId } = req.user;
        const { status } = req.query;
        const result = await expenseService.getAllCompanyExpenses(company_id, role, userId, status);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createExpense, getMyExpenses, getAllExpenses };
