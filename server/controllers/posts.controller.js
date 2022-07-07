const { saveNewPost, findAllPostsWithCommentsAndLikes } = require('../queries/posts.queries');
const { deleteFile, uploadPostPic } = require('../middlewares/filesUpload.middleware');

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

exports.getAllPosts = async (req, res) => {
  try {
    const lastId = Number(req.query.lastId);
    const limit = Number(req.query.limit);
    const posts = await findAllPostsWithCommentsAndLikes(lastId, limit);
    return res.status(200).json({ posts });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
