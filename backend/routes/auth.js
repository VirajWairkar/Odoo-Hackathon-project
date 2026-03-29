const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Signup
router.post('/signup', async (req, res) => {
  const { name, email, password, role } = req.body;

  const hashed = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashed,
    role
  });

  const { password: pass, ...rest } = user._doc;
  res.json(rest);
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) return res.status(400).json({ msg: "Invalid" });

  const { password: pass, ...rest } = user._doc;

  res.json(rest);
});

module.exports = router;