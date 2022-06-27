const { createUser } = require('../queries/users.queries');
const argon = require('../utils/argon.utils');

exports.signup = async (req, res) => {
  try {
    const { body } = req;
    const newUser = {
      email: body.email,
      password: await argon.hash(body.password),
      lastname: body.lastname,
      firstname: body.firstname
    };
    await createUser(newUser);
    res.status(201).json({ message: 'Utilisateur créé avec succés' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.login = async (req, res) => {
  try {
    res.status(200).json({ message: 'Controller login OK !' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
