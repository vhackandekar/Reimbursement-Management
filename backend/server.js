require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const expenseRoutes = require('./routes/expenseRoutes');
const approvalRoutes = require('./routes/approvalRoutes');
const ruleRoutes = require('./routes/ruleRoutes');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet({
    crossOriginResourcePolicy: false // Allow serving receipts
}));
app.use(morgan('dev'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/expenses', expenseRoutes);
app.use('/api/approvals', approvalRoutes);
app.use('/api/rules', ruleRoutes);

// Root
app.get('/', (req, res) => {
    res.json({ message: 'Reimbursement Management System API' });
});

// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error' });
});

const http = require('http');
const socket = require('./utils/socket');

const PORT = process.env.PORT || 5000;
const server = http.createServer(app);
socket.init(server);

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
