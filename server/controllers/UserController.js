const User = require('../models/UserModel');
const Item = require('../models/ItemModel');
const RefreshToken = require('../models/RefreshTokenModel');
const bcrypt = require('bcrypt');


// @desc    Get user by id
// @route   GET /api/user/:id
const getUser = async (req, res) => {

  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(400);
    throw new Error('User not found');
  }

  res.status(200).json(user);

}


// @desc    Get all Users
// @route   GET /api/User
const getUsers = async (req, res) => {

  const users = await User.find();

  res.status(200).json(users);

}


// @desc    Update a user
// @route   PUT /api/User/:id
const updateUser = async (req, res) => {

  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(400);
    throw new Error('User not found');
  }

  validateEmail(req.body.email);
  validateUsername(req.body.username);
  validatePassword(req.body.password);

  const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });

  res.status(200).json(updatedUser);

}


// @desc    Delete User
// @route   DEL /api/User/:id
const deleteUser = async (req, res) => {

  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(400);
    throw new Error('User not found');
  }

  await Item.deleteMany({ userId: req.params.id });
  await RefreshToken.deleteMany({ userId: req.params.id });

  await User.deleteOne({ _id: req.params.id });

  res.status(200).json({ id: req.params.id });
 
}


// Helper function for validating usernames
const validateUsername = async (username) => {

  const existingUsername = await User.exists({ username: username });

  if (!username) {
    console.log(username);
    throw new Error('Please enter a username.');
  }

  if (username.length < 3) {
    console.log(username);
    throw new Error('Usernames must be at least 3 characters long.');
  }

  if (existingUsername) {
    console.log(username);
    throw new Error('An account with this username already exists.');
  }

}


// Helper function for validating emails
const validateEmail = async (email) => {
  
  const existingEmail = await User.exists({ email: email });

  if (!email) {
    console.log(email);
    throw new Error('Please enter a username');
  }

  if (!email.includes('@')) {
    console.log(email);
    throw new Error('Please enter a valid email.');
  }

  if (existingEmail) {
    console.log(email);
    throw new Error('An account with this email already exists.');
  }
  
}


// Helper function for validating passwords
const validatePassword = (password) => {
  if (!password || password.length < 6) {
    console.log(password);
    throw new Error('Please enter a valid password.');
  }
}


module.exports = {
  getUser,
  getUsers,
  updateUser,
  deleteUser
}