const { Op } = require('sequelize');
const Post = require('../models/post.model');
const User = require('../models/user.model');
const Comment = require('../models/comment.model');
const UserLikePost = require('../models/user_like_post.model');
const UserLikeComment = require('../models/user_like_comment.model');

const postIncludedAttributes = [
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
    attributes: ['id', 'content', 'createdAt', 'updatedAt', 'postId'],
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
];

exports.findPaginatePosts = (lastId, limit) => {
  const idOperator = lastId ? { [Op.lt]: lastId } : { [Op.gt]: 0 };
  return Post.findAll({
    order: [['id', 'DESC']],
    attributes: ['id', 'content', 'imagePath', 'createdAt', 'updatedAt', 'userId'],
    where: { id: idOperator },
    include: postIncludedAttributes,
    limit,
    group: ['id']
  });
};

exports.findUserPaginatePosts = (lastId, limit, userId) => {
  const idOperator = lastId ? { [Op.lt]: lastId } : { [Op.gt]: 0 };
  return Post.findAll({
    order: [['id', 'DESC']],
    attributes: ['id', 'content', 'imagePath', 'createdAt', 'updatedAt', 'userId'],
    where: { id: idOperator, userId },
    include: postIncludedAttributes,
    limit,
    group: ['id']
  });
};

exports.findPostById = (postId) =>
  Post.findByPk(postId, {
    attributes: ['id', 'content', 'imagePath', 'createdAt', 'updatedAt', 'userId'],
    include: postIncludedAttributes
  });

exports.saveNewPost = (newPost) => Post.create(newPost);

exports.updatePostById = (updatedPost, postId) =>
  Post.update(updatedPost, { where: { id: postId } });

exports.deletePostById = (postId) => Post.destroy({ where: { id: postId } });

exports.saveNewLike = (userId, postId) => UserLikePost.create({ userId, postId });

exports.deleteLike = (userId, postId) => UserLikePost.destroy({ where: { userId, postId } });

exports.findLike = (userId, postId) => UserLikePost.findOne({ where: { userId, postId } });
