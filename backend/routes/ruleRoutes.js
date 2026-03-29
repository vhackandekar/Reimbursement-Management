const express = require('express');
const router = express.Router();
const ruleController = require('../controllers/ruleController');
const { verifyToken, checkRole } = require('../middleware/authMiddleware');

router.post('/create', verifyToken, checkRole(['Admin']), ruleController.createRule);
router.get('/', verifyToken, ruleController.getRules);

module.exports = router;
