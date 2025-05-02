const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const _ = require('lodash');
const User = require('../models/User');

exports.register = async (req, res) => {
  const data = _.pick(req.body, ['name', 'email', 'password','role']);
  try {
    const user = new User(data);
    await user.save();
    
    if (user.role === 'admin') {
      return res.status(201).json({ message: 'Admin registered successfully' });
    } else {
      return res.status(201).json({ message: 'User registered successfully' });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = _.pick(req.body, ['email', 'password']);
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: 'User not found' });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });
    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET,{ expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  } 
};

exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};