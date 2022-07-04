const { saveNewPost } = require('../queries/posts.queries');
const { deleteFile, uploadPostPic } = require('../utils/fileUpload.utils');

exports.createPost = [
  uploadPostPic.single('picture'),
  async (req, res) => {
    try {
      console.log(req.file);
      return res.status(201).json({ message: 'Post créé' });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }
];
