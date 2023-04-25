const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');
const RefreshToken = require('../models/RefreshTokenModel');

const handleRefreshToken = async (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) {
    console.log('Cookie not found');
    return res.sendStatus(401);
  }

  const refreshToken = cookies.jwt;

  const foundToken = await RefreshToken.findOne({ token: refreshToken });
  const foundUser = await User.findOne({ _id: foundToken.userId.toString() });

  if (!foundUser) {
    console.log('User not found in refreshtoken collection');
    return res.sendStatus(403);
  }

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    (error, decoded) => {

      if (error || foundUser.email !== decoded.email) return res.sendStatus(403);
      
      const accessToken = jwt.sign(
        { "email": decoded.email },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '5m' }
      );

      res.json({ accessToken });
    }
  );

}

module.exports = { handleRefreshToken };