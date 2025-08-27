const express = require('express');
const { registerUser, loginUser } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);   // 👈 must be /login

router.get('/me', authMiddleware, (req, res) => {
  res.json({ msg: `Welcome user ${req.user}` });
});

module.exports = router;
