const jwt = require('jsonwebtoken');
const { findUserById } = require('../queries/users.queries');
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
    const user = await findUserById(decodedToken.userId);
    if (!user) {
      res.clearCookie('jwt');
      return res.status(401).json({ message: `Utilisateur non connecté` });
    }
    req.user = user;
    req.isAuthenticated = true;
    return next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// Middleware to add login and logout feature on req object
exports.addAuthFeatures = (req, res, next) => {
  req.login = (userId) => {
    const token = createJwt(userId);
    res.cookie('jwt', token, {
      // secure: true,
      httpOnly: true,
      sameSite: 'strict',
      maxAge: jwtConfig.maxAge
    });
  };
  req.logout = () => res.clearCookie('jwt');
  next();
};
