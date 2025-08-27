const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public
exports.registerUser = async (req, res, next) => {
  try {
    console.log("👉 Inside registerUser controller");
    const { name, email, password, location } = req.body;
    console.log("📩 Request body:", { name, email, password, location });

    // Check if user exists
    console.log("🔍 Checking if user exists...");
    let user = await User.findOne({ email });
    if (user) {
      console.log("⚠️ User already exists:", email);
      return res.status(400).json({ msg: "User already exists" });
    }

    // Create new user
    console.log("🆕 Creating new user object...");
    user = new User({ name, email, password, location });

    // Hash password
    console.log("🔑 Hashing password...");
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // Save user
    console.log("💾 Saving user to DB...");
    await user.save();

    // Generate JWT
    console.log("🔐 Generating JWT...");
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    console.log("✅ Registration successful!");
    res.json({ token });
  } catch (err) {
    console.error("❌ Error in registerUser:", err.message);
    next(err);
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
exports.loginUser = async (req, res, next) => {
  try {
    console.log("👉 Inside loginUser controller");
    const { email, password } = req.body;
    console.log("📩 Login attempt:", { email });
    

    // Find user
    let user = await User.findOne({ email }).select("+password");
    if (!user) {
      console.log("⚠️ User not found:", email);
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    // Check password
    console.log("🔑 Checking password...");
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("⚠️ Password mismatch for:", email);
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    // Generate JWT
    console.log("🔐 Generating JWT for login...");
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    console.log("✅ Login successful!");
    res.json({ token });
  } catch (err) {
    console.error("❌ Error in loginUser:", err.message);
    next(err);
  }
};
