const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

async function seed() {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || 'sakshi123',
      database: process.env.DB_NAME || 'reimbursement_db',
      multipleStatements: true
    });

    const sqlPath = path.join(__dirname, 'database.sql');
    const sql = fs.readFileSync(sqlPath, 'utf8');

    console.log('Executing SQL...');
    await connection.query(sql);

    console.log('Database seeded successfully.');
    await connection.end();
  } catch (error) {
    console.error('Error seeding database:', error);
  }
}

seed();
