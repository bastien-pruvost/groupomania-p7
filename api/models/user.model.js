const { DataTypes } = require('sequelize');
const db = require('../configs/db.config');

const User = db.define(
  'user',
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(320),
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(250),
      allowNull: false
    },
    lastname: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    firstname: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    profilePicPath: {
      type: DataTypes.STRING(2083)
    },
    coverPicPath: {
      type: DataTypes.STRING(2083)
    },
    profession: {
      type: DataTypes.STRING(75)
    },
    birthDate: {
      type: DataTypes.DATEONLY
    },
    city: {
      type: DataTypes.STRING(75)
    },
    phoneNumber: {
      type: DataTypes.STRING(10)
    },
    linkedinUrl: {
      type: DataTypes.STRING(2083)
    },
    bio: {
      type: DataTypes.TEXT
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  },
  {
    indexes: [
      {
        unique: true,
        fields: ['email']
      }
    ]
  }
);

module.exports = User;
