const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { verifyToken, checkRole } = require('../middleware/authMiddleware');

router.post('/create', verifyToken, checkRole(['Admin']), userController.createUser);
router.get('/', verifyToken, userController.getUsers);
router.put('/update', verifyToken, checkRole(['Admin']), userController.updateUser);
router.put('/assign-manager', verifyToken, checkRole(['Admin']), userController.assignManager);
router.put('/update-role', verifyToken, checkRole(['Admin']), userController.updateRole);
router.post('/send-password', verifyToken, checkRole(['Admin']), userController.sendPassword);

module.exports = router;
