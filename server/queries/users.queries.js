const User = require('../models/user.model');

exports.createUser = async (newUser) => User.create(newUser);

exports.findUserById = (id) => User.findByPk(id);
