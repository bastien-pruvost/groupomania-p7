const User = require('./user.model');
const Post = require('./post.model');
const Comment = require('./comment.model');
const UserLikePost = require('./user_like_post.model');
const UserLikeComment = require('./user_like_comment.model');

// Post -> userId (Post author)
User.hasMany(Post, {
  foreignKey: 'userId',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});
Post.belongsTo(User);

// Comment -> userId (Comment author)
User.hasMany(Comment, {
  foreignKey: 'userId',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});
Comment.belongsTo(User);

// Comment -> postId (Comment on Post)
Post.hasMany(Comment, {
  foreignKey: 'postId',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});
Comment.belongsTo(Post);

// User <- UserLikePost -> Post (Post liked by User)
User.belongsToMany(Post, { through: UserLikePost });
Post.belongsToMany(User, { through: UserLikePost });
User.hasMany(UserLikePost);
Post.hasMany(UserLikePost);
UserLikePost.belongsTo(User);
UserLikePost.belongsTo(Post);

// User <- UserLikeComment -> Post (Comment liked by User)
User.belongsToMany(Comment, { through: UserLikeComment });
Comment.belongsToMany(User, { through: UserLikeComment });
User.hasMany(UserLikeComment);
Comment.hasMany(UserLikeComment);
UserLikeComment.belongsTo(User);
UserLikeComment.belongsTo(Comment);
