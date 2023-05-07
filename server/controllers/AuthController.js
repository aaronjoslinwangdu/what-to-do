const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/UserModel');
const RefreshToken = require('../models/RefreshTokenModel');


// @desc    Log user in
// @route   POST /api/auth/
const login = async (req, res) => {

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Please enter your email and password'});
  }

  const user = await User.findOne({ email: email }).exec();
  if (!user) {
    return res.status(401).json({ message: 'Email not found'});
  }

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.status(401).json({ message: 'Invalid password' });
  }

  const accessToken = jwt.sign(
    { 'email': user.email }, 
    process.env.ACCESS_TOKEN_SECRET, 
    { expiresIn: '5m' }
  );

  const refreshToken = jwt.sign(
    { 'email': user.email }, 
    process.env.REFRESH_TOKEN_SECRET, 
    { expiresIn: '1d' }
  );

  await RefreshToken.create({ token: refreshToken, userId: user._id });

  res.cookie('jwt', refreshToken, {
    httpOnly: true,                    // set back to true when using https
    maxAge: 24 * 60 * 60 * 1000
  });

  res.json({ 
    accessToken, 
    user: { 
      id: user._id,
      email: user.email, 
      username: user.username,
      location: req.body.location,
    } 
  });

}


// @desc    Sign users out
// @route   POST /auth/logout
const logout = async (req, res) => {

  // on client, also delete the accessToken IN FRONTEND !!!!

  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204);

  const refreshToken = cookies.jwt;

  const foundToken = await RefreshToken.findOne({ token: refreshToken }).exec();
  const foundUser = await User.find({ _id: foundToken.userId.toString() });

  if (!foundUser) {
    res.clearCookie('jwt', { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
    return res.sendStatus(204);
  }

  await RefreshToken.deleteOne({ token: refreshToken });

  res.clearCookie('jwt', { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
  res.sendStatus(204);

}


// @desc    Registers user
// @route   POST /auth/register
const register = async (req, res) => {

  if (!req.body.username) {
    return res.status(400).json({ message: 'Please enter a username', type: 'username'});
  }

  if (!req.body.email) {
    return res.status(400).json({ message: 'Please enter an email address', type: 'email' });
  }

  if (!req.body.password) {
    return res.status(400).json({ message: 'Please enter a password', type: 'password' });
  }

  const alphanum = /^[a-zA-Z0-9]+$/;
  if (!alphanum.test(req.body.username)) {
    return res.status(400).json({ message: 'No special characters allowed', type: 'username' });
  }

  const foundUser = await User.findOne({ username: req.body.username }).exec();
  if (foundUser) {
    return res.status(400).json({ message: 'This username is already taken', type: 'username' });
  }

  const foundEmail = await User.findOne({ email: req.body.email }).exec();
  if (foundEmail) {
    return res.status(400).json({ message: 'This email is already taken', type: 'email' });
  }

  const password = await bcrypt.hash(req.body.password, 10);

  const user = await User.create({
    username: req.body.username,
    email: req.body.email,
    password: password,
    location: req.body.location,
  });

  const accessToken = jwt.sign(
    { 'email': user.email }, 
    process.env.ACCESS_TOKEN_SECRET, 
    { expiresIn: '5m' }
  );

  const refreshToken = jwt.sign(
    { 'email': user.email }, 
    process.env.REFRESH_TOKEN_SECRET, 
    { expiresIn: '1d' }
  );


  await RefreshToken.create({ token: refreshToken, userId: user._id });

  res.cookie('jwt', refreshToken, {
    httpOnly: true,                    // set back to true when using https
    maxAge: 24 * 60 * 60 * 1000
  });

  res.json({ 
    accessToken, 
    user: { 
      id: user._id, 
      email: user.email, 
      username: user.username, 
      location: user.location
    } 
  });

}

module.exports = {
  login,
  logout,
  register
}