const { DataTypes } = require('sequelize');
const db = require('../configs/db.config');
const User = require('./user.model');
const Comment = require('./comment.model');

const UserLikeComment = db.define(
  'user_like_comment',
  {
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      references: {
        model: User,
        key: 'id'
      }
    },
    commentId: {
      type: DataTypes.INTEGER,
      references: {
        model: Comment,
        key: 'id'
      }
    }
  },
  { tableName: 'user_like_comment' }
);

module.exports = UserLikeComment;
