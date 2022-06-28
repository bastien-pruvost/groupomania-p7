const { createUser } = require('../queries/users.queries');
const argon = require('../utils/argon.utils');

const { findUserById } = require('../queries/users.queries');

exports.register = async (req, res) => {
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
    const user = await findUserById(5);
    console.log(user);
    res.status(200).json({ message: user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
