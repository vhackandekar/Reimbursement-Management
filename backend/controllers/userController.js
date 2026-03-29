const userService = require('../services/userService');

const createUser = async (req, res) => {
    try {
        const { company_id } = req.user;
        const { name, email, role, manager_id } = req.body;
        const result = await userService.createUser(company_id, name, email, role, manager_id);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getUsers = async (req, res) => {
    try {
        const { company_id } = req.user;
        const result = await userService.getAllUsers(company_id);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateUser = async (req, res) => {
    try {
        const { userId } = req.body;
        const result = await userService.updateUser(userId, req.body);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const assignManager = async (req, res) => {
    try {
        const { userId, managerId } = req.body;
        const result = await userService.assignManager(userId, managerId);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateRole = async (req, res) => {
    try {
        const { userId, role } = req.body;
        const result = await userService.updateRole(userId, role);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const sendPassword = async (req, res) => {
    try {
        const { userId } = req.body;
        const result = await userService.sendPassword(userId);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createUser, getUsers, updateUser, assignManager, updateRole, sendPassword };
