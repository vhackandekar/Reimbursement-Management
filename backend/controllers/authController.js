const authService = require('../services/authService');

const signup = async (req, res) => {
    try {
        const { companyName, country, adminName, adminEmail, adminPassword } = req.body;
        const result = await authService.registerCompany(companyName, country, adminName, adminEmail, adminPassword);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await authService.login(email, password);
        res.status(200).json(result);
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};

const logout = async (req, res) => {
    // JWT is stateless, client just needs to discard the token.
    res.status(200).json({ message: 'Logged out successfully' });
};

module.exports = { signup, login, logout };
