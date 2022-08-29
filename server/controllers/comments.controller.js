const {
  saveNewComment,
  updateCommentById,
  deleteCommentById
} = require('../queries/comments.queries');
const { findPostById } = require('../queries/posts.queries');

exports.createComment = async (req, res) => {
  try {
    const { body, currentUser } = req;
    const comment = {
      content: body.content,
      postId: body.postId,
      userId: currentUser.id
    };
    await saveNewComment(comment);
    const updatedPost = await findPostById(body.postId);
    return res.status(201).json({ message: 'Le commentaire a été publié', post: updatedPost });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.updateComment = async (req, res) => {
  try {
    const { body, comment } = req;
    const updatedComment = { content: body.content };
    await updateCommentById(updatedComment, comment.id);
    const updatedPost = await findPostById(comment.postId);
    return res.status(200).json({ message: 'Le commentaire a été modifié', post: updatedPost });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const { comment } = req;
    deleteCommentById(comment.id);
    const updatedPost = await findPostById(comment.postId);
    return res.status(200).json({ message: 'Le commentaire a été supprimé', post: updatedPost });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
