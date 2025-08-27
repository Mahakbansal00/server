const User = require('../models/User');

// Get logged-in user's skills
const getMySkills = async (req, res, next) => {
  try {
    res.json({
      teaches: req.user.teaches,
      learns: req.user.learns
    });
  } catch (err) {
    next(err);
  }
};

// Add a skill
const addSkill = async (req, res, next) => {
  const { type, skill } = req.body;

  if (!type || !skill) {
    return res.status(400).json({ message: 'Type and skill are required' });
  }

  try {
    if (type === 'teaches') {
      req.user.teaches.push({ name: skill, level: 'beginner' });
    } else if (type === 'learns') {
      req.user.learns.push({ name: skill, level: 'beginner' });
    } else {
      return res.status(400).json({ message: 'Invalid type' });
    }

    await req.user.save();
    res.status(200).json({ teaches: req.user.teaches, learns: req.user.learns });
  } catch (err) {
    next(err);
  }
};

// Remove a skill by index
const removeSkill = async (req, res, next) => {
  const { id } = req.params;
  const { type } = req.body;

  try {
    if (type === 'teaches') {
      req.user.teaches = req.user.teaches.filter((_, index) => index.toString() !== id);
    } else if (type === 'learns') {
      req.user.learns = req.user.learns.filter((_, index) => index.toString() !== id);
    } else {
      return res.status(400).json({ message: 'Invalid type' });
    }

    await req.user.save();
    res.status(200).json({ teaches: req.user.teaches, learns: req.user.learns });
  } catch (err) {
    next(err);
  }
};

// Export all three functions
module.exports = { getMySkills, addSkill, removeSkill };
