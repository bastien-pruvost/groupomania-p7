const { Op } = require('sequelize');
const db = require('../configs/db.config');
const Post = require('../models/post.model');
const User = require('../models/user.model');
const Comment = require('../models/comment.model');
const UserLikePost = require('../models/user_like_post.model');
const UserLikeComment = require('../models/user_like_comment.model');

exports.findAllPostsWithCommentsAndLikes = (lastId, limit) => {
  const idOperator = lastId ? { [Op.lt]: lastId } : { [Op.gt]: 0 };
  return Post.findAll({
    order: [['id', 'DESC']],
    attributes: ['id', 'content', 'imagePath', 'createdAt', 'updatedAt'],
    where: { id: idOperator },
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
    limit,
    group: ['id']
  });
};

exports.findPostById = (postId) =>
  Post.findByPk(postId, {
    attributes: ['id', 'userId', 'imagePath', 'content']
  });

exports.saveNewPost = (newPost) => Post.create(newPost);

exports.saveUpdatedPost = (updatedPost, postId) =>
  Post.update(updatedPost, { where: { id: postId } });
