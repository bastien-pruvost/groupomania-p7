const jwt = require('jsonwebtoken');
const argon = require('../utils/argon.utils');
const { createUser } = require('../queries/users.queries');
const {
  findUserIdAndPasswordByEmail,
  findUserRoleById
} = require('../queries/users.queries');

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
    return res
      .status(201)
      .json({ message: 'Utilisateur créé', userId: user.id });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// Controller to connect a user by creating a token
exports.signin = async (req, res) => {
  try {
    const user = await findUserIdAndPasswordByEmail(req.body.email);
    // console.log(user);
    if (!user)
      return res
        .status(401)
        .json({ message: `Email ou mot de passe incorrect` });
    const passwordIsValid = await argon.verify(
      req.body.password,
      user.password
    );
    if (!passwordIsValid)
      return res
        .status(401)
        .json({ message: `Email ou mot de passe incorrect` });
    req.signin(user.id);
    return res
      .status(200)
      .json({ message: 'Utilisateur connecté', userId: user.id });
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
    const responseObject = { userId: null, userIsAdmin: false };
    const token = req.cookies.jwt;
    console.log(token);
    if (!token) {
      res.clearCookie('jwt');
    } else {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      const user = await findUserRoleById(decodedToken.userId);
      console.log(user);
      if (!user) {
        res.clearCookie('jwt');
      } else {
        responseObject.userId = user.id;
        responseObject.userIsAdmin = user.isAdmin;
      }
    }
    return res.status(200).json(responseObject);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};
