const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); 
const config = require("../config");

const registerUser = async (username, password, role) => {
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    throw new Error('User already exists');
  }

  const user = new User({
    username,
    password,
    role,
  });

  await user.save();
  return user;
};

const loginUser = async (username, password) => {
  const user = await User.findOne({ username });
  if (!user) {
    return null; 
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return null; 
  }

  const token = jwt.sign({ id: user._id }, config.jwt.secret, {
    expiresIn: '1h',
  });
  return token;
};

module.exports = {
  registerUser,
  loginUser,
};
