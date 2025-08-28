const User = require('../models/User');

// Find complementary matches for the logged-in user
const getMatches = async (req, res) => {
  try {
    const user = req.user;

    // Users that teach what this user wants to learn
    const teachesMe = await User.find({
      teaches: { $in: user.learns },
      _id: { $ne: user._id } // exclude self
    }).select('name email location teaches learns');

    // Users that want to learn what this user can teach
    const learnsFromMe = await User.find({
      learns: { $in: user.teaches },
      _id: { $ne: user._id } // exclude self
    }).select('name email location teaches learns');

    res.json({ teachesMe, learnsFromMe });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getMatches };
