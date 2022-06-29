const User = require('../models/user.model');

exports.createUser = async (newUser) => User.create(newUser);

exports.findUserById = (userId) => User.findByPk(userId);

exports.findUserByEmail = (userEmail) =>
  User.findOne({ where: { email: userEmail }, attributes: ['id', 'password'] });
