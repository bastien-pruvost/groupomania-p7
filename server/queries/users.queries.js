const User = require('../models/user.model');

exports.createUser = async (newUser) => {
  try {
    await User.create(newUser);
  } catch (err) {
    const errors = [];
    err.errors.forEach((error) => {
      errors.push(error.message);
    });
    throw errors;
  }
};
