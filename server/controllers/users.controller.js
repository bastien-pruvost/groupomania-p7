const { createUser } = require('../queries/users.queries');
const argon = require('../utils/argon.utils');

const { findUserByEmail } = require('../queries/users.queries');

exports.register = async (req, res) => {
  try {
    const { body } = req;
    const newUser = {
      email: body.email,
      password: await argon.hash(body.password),
      lastname: body.lastname,
      firstname: body.firstname
    };
    const user = await createUser(newUser);
    req.login(user.id);
    return res
      .status(201)
      .json({ message: 'Utilisateur créé', userId: user.id });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// Controller to connect a user by creating a token
exports.login = async (req, res) => {
  try {
    const user = await findUserByEmail(req.body.email);
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
    req.login(user.id);
    return res
      .status(200)
      .json({ message: 'Utilisateur connecté', userId: user.id });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.logout = async (req, res) => {
  try {
    req.logout();
    return res.status(200).json({ message: 'Utilisateur déconnecté' });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.jwtid = async (req, res) => {
  try {
    return res.status(200).json({ userId: req.user.id });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
