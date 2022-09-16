const { DataTypes } = require('sequelize');
const db = require('../configs/db.config');
const User = require('./user.model');
const Post = require('./post.model');

const UserLikePost = db.define(
  'user_like_post',
  {
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      references: {
        model: User,
        key: 'id'
      }
    },
    postId: {
      type: DataTypes.INTEGER,
      references: {
        model: Post,
        key: 'id'
      }
    }
  },
  { tableName: 'user_like_post' }
);

module.exports = UserLikePost;
