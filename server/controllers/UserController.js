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

  if (!req.body.username) {
    return res.status(400).json({ message: 'Please enter a username', type: 'username'});
  }
  
  if (!req.body.email) {
    return res.status(400).json({ message: 'Please enter an email address', type: 'email' });
  }
  
  const alphanum = /^[a-zA-Z0-9]+$/;
  if (!alphanum.test(req.body.username)) {
    return res.status(400).json({ message: 'No special characters allowed', type: 'username' });
  }
  
  const foundUser = await User.findOne({ username: req.body.username }).exec();

  if (!(user.username === req.body.username) && foundUser) {
    return res.status(400).json({ message: 'This username is already taken', type: 'username' });
  }
  
  const foundEmail = await User.findOne({ email: req.body.email }).exec();
  if (!(user.email === req.body.email) && foundEmail) {
    return res.status(400).json({ message: 'This email is already taken', type: 'email' });
  }

  await user.updateOne({ username: req.body.username, email: req.body.email, location: req.body.location }).exec();

  res.status(200).json({ id: user._id, username: req.body.username, email: req.body.email, location: req.body.location });

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