const User = require('./user.model');
const Post = require('./post.model');
const Comment = require('./comment.model');

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
User.belongsToMany(Post, { through: 'user_like_post' });
Post.belongsToMany(User, { through: 'user_like_post' });

// User <- UserLikeComment -> Post (Comment liked by User)
User.belongsToMany(Comment, { through: 'user_like_comment' });
Comment.belongsToMany(User, { through: 'user_like_comment' });
