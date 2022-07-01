const User = require('./user.model');
const Post = require('./post.model');

// Post -> userId (Post author)
User.hasMany(Post, {
  foreignKey: 'userId',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});

Post.belongsTo(User);

// User <- UserLikePost -> Post (Post likes)
User.belongsToMany(Post, { through: 'user_like_post' });
Post.belongsToMany(User, { through: 'user_like_post' });
