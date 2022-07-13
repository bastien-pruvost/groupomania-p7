const {
  saveNewComment,
  updateCommentById,
  deleteCommentById
} = require('../queries/comments.queries');
const { findPostById } = require('../queries/posts.queries');

exports.createComment = async (req, res) => {
  try {
    const { body, user } = req;
    const comment = {
      content: body.content,
      postId: body.postId,
      userId: user.id
    };
    await saveNewComment(comment);
    const updatedPost = await findPostById(body.postId);
    return res.status(201).json({ message: 'Le commentaire a été publié', post: updatedPost });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// exports.updateComment = async (req, res) => {
//   try {
//     const { body, file, user, post } = req;
//     const updatedPost = { content: body.content, userId: user.id };
//     if (file) {
//       !!post.imagePath && deleteFile(post.imagePath);
//       updatedPost.imagePath = file.filename;
//     } else if (body.imageDeleted === 'true') {
//       !!post.imagePath && deleteFile(post.imagePath);
//       updatedPost.imagePath = null;
//     } else {
//       updatedPost.imagePath = post.imagePath;
//     }
//     await updatePostById(updatedPost, post.id);
//     const savedPost = await findPostById(post.id);
//     return res.status(200).json({ message: 'Le post a été modifié', post: savedPost });
//   } catch (err) {
//     return res.status(500).json({ message: err.message });
//   }
// };

// exports.deleteComment = async (req, res) => {
//   try {
//     const postId = req.post.id;
//     deletePostById(postId);
//     return res.status(200).json({ message: 'Le post a été supprimé' });
//   } catch (err) {
//     return res.status(500).json({ message: err.message });
//   }
// };
