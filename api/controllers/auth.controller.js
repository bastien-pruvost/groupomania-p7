const jwt = require('jsonwebtoken');
const argon = require('../utils/argon.utils');
const { createUser } = require('../queries/users.queries');
const { findUserByEmail, findCurrentUserById } = require('../queries/users.queries');

exports.signup = async (req, res) => {
  try {
    const { body } = req;
    const newUser = {
      email: body.email,
      password: await argon.hash(body.password),
      lastname: body.lastname,
      firstname: body.firstname
    };
    const user = await createUser(newUser);
    req.signin(user.id);
    const responseUserObject = {
      id: user.id,
      isAdmin: user.isAdmin,
      firstname: user.firstname,
      lastname: user.lastname,
      profilePicPath: user.profilePicPath
    };
    return res.status(201).json({ message: 'Utilisateur créé', user: responseUserObject });
  } catch (err) {
    if (err.errors[0]?.message === 'users_email must be unique') {
      return res.status(400).json({ message: 'Cet email est déja utilisé' });
    }
    return res.status(500).json({ message: err.message });
  }
};

exports.signin = async (req, res) => {
  try {
    const user = await findUserByEmail(req.body.email);
    if (!user) return res.status(401).json({ message: `Email ou mot de passe incorrect` });
    const passwordIsValid = await argon.verify(req.body.password, user.password);
    if (!passwordIsValid)
      return res.status(401).json({ message: `Email ou mot de passe incorrect` });
    req.signin(user.id);
    return res.status(200).json({
      message: 'Utilisateur connecté',
      user: {
        id: user.id,
        isAdmin: user.isAdmin,
        firstname: user.firstname,
        lastname: user.lastname,
        profilePicPath: user.profilePicPath
      }
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.signout = async (req, res) => {
  try {
    req.signout();
    return res.status(200).json({ message: 'Utilisateur déconnecté' });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.getCurrentUser = async (req, res) => {
  try {
    const noUser = {
      id: null,
      isAdmin: false,
      firstname: '',
      lastname: '',
      profilePicPath: 'default-profile-pic.jpg'
    };
    const token = req.cookies.jwt;
    if (!token) {
      res.clearCookie('jwt');
      return res.status(200).json(noUser);
    }
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const user = await findCurrentUserById(decodedToken.userId);
    if (!user) {
      res.clearCookie('jwt');
      return res.status(200).json(noUser);
    }
    return res.status(200).json({
      id: user.id,
      isAdmin: user.isAdmin,
      firstname: user.firstname,
      lastname: user.lastname,
      profilePicPath: user.profilePicPath
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
