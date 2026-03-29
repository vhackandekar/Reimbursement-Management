const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../config/db');
const { getCurrencyByCountry } = require('../utils/apiClient');

const registerCompany = async (companyName, country, adminName, adminEmail, adminPassword) => {
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        // 1. Get Currency
        const currency = await getCurrencyByCountry(country);

        // 2. Create Company
        const [companyResult] = await connection.execute(
            'INSERT INTO Companies (name, country, currency) VALUES (?, ?, ?)',
            [companyName, country, currency]
        );
        const companyId = companyResult.insertId;

        // 3. Create Admin User
        const hashedPassword = await bcrypt.hash(adminPassword, 10);
        await connection.execute(
            'INSERT INTO Users (company_id, name, email, password, role) VALUES (?, ?, ?, ?, ?)',
            [companyId, adminName, adminEmail, hashedPassword, 'Admin']
        );

        await connection.commit();
        return { companyId, currency, message: 'Company and Admin created' };
    } catch (error) {
        await connection.rollback();
        throw error;
    } finally {
        connection.release();
    }
};

const login = async (email, password) => {
    const [rows] = await pool.execute('SELECT * FROM Users WHERE email = ?', [email]);
    if (rows.length === 0) throw new Error('Invalid credentials');

    const user = rows[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error('Invalid credentials');

    const token = jwt.sign(
        { id: user.id, company_id: user.company_id, role: user.role },
        process.env.JWT_SECRET || 'secret',
        { expiresIn: '24h' }
    );

    return { token, user: { id: user.id, name: user.name, email: user.email, role: user.role } };
};

module.exports = { registerCompany, login };
