const express = require('express');
const { registerUser, loginUser } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');
const User = require('../models/User');

const router = express.Router(); // 👈 important

router.post('/register', registerUser);
router.post('/login', loginUser);

router.get('/me', authMiddleware, async (req, res, next) => {
  const user = await User.findById(req.user).select('-password');
  if (!user) return res.status(404).json({ msg: 'User not found' });

  res.json({
    id: user._id,
    name: user.name,
    email: user.email,
    location: user.location,
    teaches: user.teaches || [],
    learns: user.learns || [],
    createdAt: user.createdAt,
  });
});

module.exports = router;
