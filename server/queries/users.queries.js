const User = require('../models/user.model');

exports.createUser = async (newUser) => User.create(newUser);

exports.findCurrentUserById = (userId) =>
  User.findByPk(userId, {
    attributes: ['id', 'isAdmin', 'lastname', 'firstname', 'profilePicPath']
  });

exports.findUserByEmail = (userEmail) =>
  User.findOne({
    where: { email: userEmail },
    attributes: [
      'id',
      'password',
      'isAdmin',
      'lastname',
      'firstname',
      'profilePicPath'
    ]
  });
