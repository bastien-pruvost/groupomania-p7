const { saveNewPost, findAllPosts } = require('../queries/posts.queries');
const { deleteFile, uploadPostPic } = require('../utils/fileUpload.utils');

exports.createPost = [
  uploadPostPic.single('picture'),
  async (req, res) => {
    try {
      const { body, file, user } = req;
      const post = {
        content: body.content,
        imagePath: req.file ? file.filename : null,
        userId: user.id
      };
      const newPost = await saveNewPost(post);
      return res.status(201).json({ message: 'Post créé', post: newPost });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }
];

exports.getAllPosts = async (req, res) => {
  try {
    const { offset } = req.body;
    const posts = await findAllPosts(offset);
    return res.status(201).json({ posts });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};
