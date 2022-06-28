const jwt = require('jsonwebtoken');
const { jwtConfig } = require('../configs/jwt.config');

exports.createJwt = (user) => {
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
    expiresIn: jwtConfig.maxAge
  });
  return token;
};
