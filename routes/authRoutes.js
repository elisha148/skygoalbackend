const express = require('express');
const { register, login, deleteUser } = require('../controllers/authController');
const auth = require('../middleware/authMiddleware');
const role = require('../middleware/roleMiddleware');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.delete('/:id', auth, role('admin'), deleteUser);

module.exports = router;
