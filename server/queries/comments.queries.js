const { Op } = require('sequelize');
const Post = require('../models/post.model');
const User = require('../models/user.model');
const Comment = require('../models/comment.model');
const UserLikePost = require('../models/user_like_post.model');
const UserLikeComment = require('../models/user_like_comment.model');

exports.findCommentById = (commentId) =>
  Comment.findByPk(commentId, {
    attributes: ['id', 'userId', 'postId', 'content']
  });

exports.saveNewComment = (newComment) => Comment.create(newComment);

exports.updateCommentById = (updatedComment, commentId) =>
  Comment.update(updatedComment, { where: { id: commentId } });

exports.deleteCommentById = (commentId) => Comment.destroy({ where: { id: commentId } });
