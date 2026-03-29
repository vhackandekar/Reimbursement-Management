const express = require('express');
const router = express.Router();
const approvalController = require('../controllers/approvalController');
const { verifyToken, checkRole } = require('../middleware/authMiddleware');

router.get('/pending', verifyToken, checkRole(['Manager', 'Admin']), approvalController.getPending);
router.post('/:id/approve', verifyToken, checkRole(['Manager', 'Admin']), approvalController.approve);
router.post('/:id/reject', verifyToken, checkRole(['Manager', 'Admin']), approvalController.reject);

module.exports = router;
