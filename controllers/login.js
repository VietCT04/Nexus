// controllers/login.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ msg: 'Provide username and password' });
    }

    const user = await User.findOne({ username });
    if (!user || !(await user.comparePassword(password))) {
      // Don't leak which field was wrong
      return res.status(401).json({ msg: 'Invalid username or password' });
    }

    const token = jwt.sign(
      { userId: user._id },           // <-- must match getUserId middleware
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Optional: only return non-sensitive fields
    res.status(200).json({
      token,
      user: { id: user._id, username: user.username, fullname: user.fullname },
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ msg: 'Server error' });
  }
};
