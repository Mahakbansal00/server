const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');
const {
  getMySkills,
  addSkill,
  removeSkill
} = require('../controllers/skillController');

// Protected routes
router.get('/me', protect, getMySkills); // Get logged-in user's skills
router.post('/', protect, addSkill); // Add a skill
router.delete('/:id', protect, removeSkill); // Remove a skill by ID

module.exports = router;
