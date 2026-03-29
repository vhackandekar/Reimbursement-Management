const bcrypt = require('bcrypt');
const pool = require('../config/db');

const createUser = async (companyId, name, email, role, managerId = null) => {
    const randomPassword = Math.random().toString(36).slice(-8); // Generate random password
    const hashedPassword = await bcrypt.hash(randomPassword, 10);

    const [result] = await pool.execute(
        'INSERT INTO Users (company_id, name, email, password, role, manager_id) VALUES (?, ?, ?, ?, ?, ?)',
        [companyId, name, email, hashedPassword, role, managerId]
    );

    return { id: result.insertId, email, password: randomPassword, role, message: 'User created' };
};

const getAllUsers = async (companyId) => {
    const [rows] = await pool.execute('SELECT id, name, email, role, manager_id FROM Users WHERE company_id = ?', [companyId]);
    return rows;
};

const updateUser = async (userId, data) => {
    const { name, email, role, manager_id } = data;
    await pool.execute(
        'UPDATE Users SET name = ?, email = ?, role = ?, manager_id = ? WHERE id = ?',
        [name, email, role, manager_id, userId]
    );
    return { message: 'User updated' };
};

const assignManager = async (userId, managerId) => {
    await pool.execute('UPDATE Users SET manager_id = ? WHERE id = ?', [managerId, userId]);
    return { message: 'Manager assigned' };
};

const updateRole = async (userId, role) => {
    await pool.execute('UPDATE Users SET role = ? WHERE id = ?', [role, userId]);
    return { message: 'Role updated' };
};

const sendPassword = async (userId) => {
    const randomPassword = Math.random().toString(36).slice(-8);
    const hashedPassword = await bcrypt.hash(randomPassword, 10);
    await pool.execute('UPDATE Users SET password = ? WHERE id = ?', [hashedPassword, userId]);
    // In production, send this via email/SMS. Mocked here.
    return { message: 'Password reset and sent', newPassword: randomPassword };
};

module.exports = { createUser, getAllUsers, updateUser, assignManager, updateRole, sendPassword };
