const {
  saveNewPost,
  findPaginatePostsWithCommentsAndLikes,
  findPostById,
  updatePostById,
  deletePostById
} = require('../queries/posts.queries');
const { deleteFile } = require('../middlewares/filesUpload.middleware');

exports.getAllPosts = async (req, res) => {
  try {
    const lastId = Number(req.query.lastId);
    const limit = Number(req.query.limit);
    const posts = await findPaginatePostsWithCommentsAndLikes(lastId, limit);
    return res.status(200).json({ posts });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.createPost = async (req, res) => {
  try {
    const { body, file, user } = req;
    const post = {
      content: body.content,
      imagePath: req.file ? file.filename : null,
      userId: user.id
    };
    const savedPost = await saveNewPost(post);
    return res.status(201).json({ message: 'Le post a été publié', post: savedPost });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const { body, file, user, post } = req;
    const updatedPost = { content: body.content, userId: user.id };
    if (file) {
      !!post.imagePath && deleteFile(post.imagePath);
      updatedPost.imagePath = file.filename;
    } else if (body.imageDeleted === 'true') {
      !!post.imagePath && deleteFile(post.imagePath);
      updatedPost.imagePath = null;
    } else {
      updatedPost.imagePath = post.imagePath;
    }
    await updatePostById(updatedPost, post.id);
    const savedPost = await findPostById(post.id);
    return res.status(200).json({ message: 'Le post a été modifié', post: savedPost });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const postId = req.post.id;
    deletePostById(postId);
    return res.status(200).json({ message: 'Le post a été supprimé' });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
