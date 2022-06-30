const User = require('../models/user.model');

exports.createUser = async (newUser) => User.create(newUser);

exports.findUserRoleById = (userId) =>
  User.findByPk(userId, { attributes: ['id', 'isAdmin'] });

exports.findUserIdAndPasswordByEmail = (userEmail) =>
  User.findOne({ where: { email: userEmail }, attributes: ['id', 'password'] });
