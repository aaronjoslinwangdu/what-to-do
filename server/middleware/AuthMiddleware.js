const jwt = require('jsonwebtoken');

const verifyJwt = (req, res, next) => {
  
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (!authHeader) return res.status(401);

  const token = authHeader.split(' ')[1];

  jwt.verify(
    token, 
    process.env.ACCESS_TOKEN_SECRET, 
    (error, decoded) => {
      if (error) return res.status(403).json({ message: 'Access forbidden' });
      req.user = decoded.email;
      next();
    });

}

module.exports = verifyJwt;