const approvalService = require('../services/approvalService');

const getPending = async (req, res) => {
    try {
        const { id: userId } = req.user;
        const result = await approvalService.getPendingApprovals(userId);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const approve = async (req, res) => {
    try {
        const { id: approvalId } = req.params;
        const { id: userId } = req.user;
        const { comments } = req.body;
        const result = await approvalService.approveExpense(approvalId, userId, comments);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const reject = async (req, res) => {
    try {
        const { id: approvalId } = req.params;
        const { id: userId } = req.user;
        const { comments } = req.body;
        const result = await approvalService.rejectExpense(approvalId, userId, comments);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getPending, approve, reject };
