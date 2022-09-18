const jwt = require('jsonwebtoken');
const { jwtConfig } = require('../configs/jwt.config');

exports.createJwt = (userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: jwtConfig.maxAge
  });
  return token;
};
