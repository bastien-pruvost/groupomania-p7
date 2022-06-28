const jwt = require('jsonwebtoken');

exports.createJwt = (user) => {
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
  return token;
};
