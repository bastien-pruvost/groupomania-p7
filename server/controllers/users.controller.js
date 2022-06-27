const User = require('../models/user.model');

exports.signup = async (req, res) => {
  try {
    const { body } = req;
    console.log(body.password);
    res.status(200).json({ message: 'Controller signup OK !' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    res.status(200).json({ message: 'Controller login OK !' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
