const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '').trim();

  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the full user object, not just ID
    req.user = await User.findById(decoded.id).select('-password');

    next();
  } catch (err) {
    next(err); // Pass error to centralized error handler
  }
};

module.exports = authMiddleware;
