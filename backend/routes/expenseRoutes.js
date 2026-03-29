const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expenseController');
const { verifyToken } = require('../middleware/authMiddleware');
const upload = require('../utils/upload');

router.post('/', verifyToken, upload.single('receipt'), expenseController.createExpense);
router.get('/my', verifyToken, expenseController.getMyExpenses);
router.get('/all', verifyToken, expenseController.getAllExpenses);

module.exports = router;
