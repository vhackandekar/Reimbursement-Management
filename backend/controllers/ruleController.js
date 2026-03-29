const ruleService = require('../services/ruleService');

const createRule = async (req, res) => {
    try {
        const { company_id } = req.user;
        const { name, ruleType, config } = req.body;
        const result = await ruleService.createRule(company_id, name, ruleType, config);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getRules = async (req, res) => {
    try {
        const { company_id } = req.user;
        const result = await ruleService.getRules(company_id);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createRule, getRules };
