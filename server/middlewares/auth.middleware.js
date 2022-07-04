const jwt = require('jsonwebtoken');
const { findCurrentUserById } = require('../queries/users.queries');
const { createJwt } = require('../utils/jwt.utils');
const { jwtConfig } = require('../configs/jwt.config');

// Middleware to ensure that the user is properly connected and add the user to the request object if he is connected
exports.ensureAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      res.clearCookie('jwt');
      return res.status(401).json({ message: `Utilisateur non connecté` });
    }
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const user = await findCurrentUserById(decodedToken.userId);
    if (!user) {
      res.clearCookie('jwt');
      return res.status(401).json({ message: `Utilisateur non connecté` });
    }
    req.user = user;
    return next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// Middleware to add signin and signout feature on req object
exports.addAuthFeatures = (req, res, next) => {
  req.signin = (userId) => {
    const token = createJwt(userId);
    res.cookie('jwt', token, {
      // secure: true,
      httpOnly: true,
      sameSite: 'strict',
      maxAge: jwtConfig.maxAge
    });
  };
  req.signout = () => res.clearCookie('jwt');
  next();
};
