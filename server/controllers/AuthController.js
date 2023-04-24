const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/UserModel');


// @desc    Log user in
// @route   POST /api/auth/
const login = async (req, res) => {

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Please enter your email and password'});
  }

  const user = await User.findOne({ email: email }).exec();
  if (!user) {
    return res.status(401).json({ message: 'User not found'});
  }

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.status(401).json({ message: 'Invalid password' });
  }

  const accessToken = jwt.sign(
    { 'email': user.email }, 
    process.env.ACCESS_TOKEN_SECRET, 
    { expiresIn: '1m' }
  );

  const refreshToken = jwt.sign(
    { 'email': user.email }, 
    process.env.REFRESH_TOKEN_SECRET, 
    { expiresIn: '1d' }
  );

  res.cookie('jwt', refreshToken, {
    httpOnly: true,                    // set back to true when using https
    maxAge: 24 * 60 * 60 * 1000
  });

  res.json({ accessToken });

}


// @desc    Sign users out
// @route   POST /auth/logout
const logout = async (req, res) => {

  const cookies = req.cookies;
  if (!cookies?.jwt) {
    return res.status(204);
  }

  res.clearCookie('jwt', {
    httpOnly: false,
    secure: false,
    sameSite: 'None'
  });

  res.json({ message: 'Cookie cleared' });

}



module.exports = {
  login,
  logout
}