const { DataTypes } = require('sequelize');
const db = require('../configs/db.config');

const Post = db.define('post', {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  content: {
    type: DataTypes.TEXT
  },
  imageUrl: {
    type: DataTypes.TEXT
  }
});

module.exports = Post;
