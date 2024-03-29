const {
  saveNewPost,
  findPaginatePosts,
  findPostById,
  updatePostById,
  deletePostById,
  saveNewLike,
  deleteLike,
  findLike,
  findUserPaginatePosts
} = require('../queries/posts.queries');
const { deleteFile } = require('../middlewares/filesUpload.middleware');

exports.getAllPosts = async (req, res) => {
  try {
    const lastId = Number(req.query.lastId);
    const limit = Number(req.query.limit);
    const posts = await findPaginatePosts(lastId, limit);
    return res.status(200).json({ posts });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
exports.getUserPosts = async (req, res) => {
  try {
    const lastId = Number(req.query.lastId);
    const limit = Number(req.query.limit);
    const userId = Number(req.params.userId);
    const posts = await findUserPaginatePosts(lastId, limit, userId);
    return res.status(200).json({ posts });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.createPost = async (req, res) => {
  try {
    const { body, files, currentUser } = req;
    const image = files.postPic ? files.postPic[0] : null;
    const post = {
      content: body.content,
      imagePath: image ? image.filename : null,
      userId: currentUser.id
    };
    const savedPost = await saveNewPost(post);
    return res.status(201).json({ message: 'Le post a été publié', post: savedPost });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const { body, files, post } = req;
    const image = files.postPic ? files.postPic[0] : null;
    const updatedPost = { content: body.content };
    if (image) {
      deleteFile(post.imagePath);
      updatedPost.imagePath = image.filename;
    } else if (body.imageDeleted === 'true') {
      deleteFile(post.imagePath);
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
    await deletePostById(postId);
    deleteFile(req.post.imagePath);
    return res.status(200).json({ message: 'Le post a été supprimé' });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.likePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const userId = req.currentUser.id;
    const alreadyLiked = await findLike(userId, postId);
    if (alreadyLiked) return res.status(400).json({ message: 'Vous avez déja liké ce post' });
    await saveNewLike(userId, postId);
    const updatedPost = await findPostById(postId);
    return res.status(200).json({ message: 'Le post a été liké', post: updatedPost });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.dislikePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const userId = req.currentUser.id;
    await deleteLike(userId, postId);
    const updatedPost = await findPostById(postId);
    return res.status(200).json({ message: 'Le like a été supprimé', post: updatedPost });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
