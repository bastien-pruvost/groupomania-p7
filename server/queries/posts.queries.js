const sequelize = require('sequelize');
const db = require('../configs/db.config');
const Post = require('../models/post.model');
const User = require('../models/user.model');
const UserLikePost = require('../models/user_like_post.model');

exports.saveNewPost = (post) => Post.create(post);

exports.findAllPosts = (offset) =>
  Post.findAll({
    order: [['createdAt', 'DESC']],
    subQuery: false,
    attributes: [
      'id',
      'content',
      'imagePath',
      'createdAt',
      'updatedAt',
      [
        sequelize.fn('COUNT', sequelize.col('user_like_posts.userId')),
        'likeCount'
      ]
    ],
    include: [
      {
        model: User,
        attributes: ['id', 'lastname', 'firstname', 'profilePicPath']
      },
      {
        model: UserLikePost,
        as: 'user_like_posts',
        attributes: ['userId']
      }
    ],
    offset,
    limit: 10,
    group: ['id']
  });
