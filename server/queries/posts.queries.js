const sequelize = require('sequelize');
const db = require('../configs/db.config');
const Post = require('../models/post.model');
const User = require('../models/user.model');
const Comment = require('../models/comment.model');
const UserLikePost = require('../models/user_like_post.model');
const UserLikeComment = require('../models/user_like_comment.model');

exports.saveNewPost = (post) => Post.create(post);

exports.findAllPostsWithCommentsAndLikes = (offset) => {
  const posts = Post.findAll({
    order: [['createdAt', 'DESC']],
    attributes: ['id', 'content', 'imagePath', 'createdAt', 'updatedAt'],
    include: [
      {
        model: User,
        attributes: ['id', 'lastname', 'firstname', 'profilePicPath']
      },
      {
        model: UserLikePost,
        attributes: ['createdAt'],
        include: [
          {
            model: User,
            attributes: ['id', 'firstname', 'lastname', 'profilePicPath']
          }
        ]
      },
      {
        model: Comment,
        as: 'comments',
        attributes: ['id', 'content', 'createdAt', 'updatedAt'],
        include: [
          {
            model: User,
            attributes: ['id', 'firstname', 'lastname', 'profilePicPath']
          },
          {
            model: UserLikeComment,
            attributes: ['createdAt'],
            include: [
              {
                model: User,
                attributes: ['id', 'firstname', 'lastname', 'profilePicPath']
              }
            ]
          }
        ]
      }
    ],
    offset: Number.isNaN(offset) ? null : offset,
    limit: 10,
    group: ['id']
  });

  return posts;
};
