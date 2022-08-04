import {
  createCommentQuery,
  deleteCommentQuery,
  updateCommentQuery
} from 'services/comments.services';

const useComment = () => {
  const createComment = async (data) => {
    try {
      const updatedPost = await createCommentQuery(data);
      return updatedPost;
    } catch (err) {
      throw Array.isArray(err.message) ? err.message : [err.message];
    }
  };

  const updateComment = async (commentId, data) => {
    try {
      const updatedPost = await updateCommentQuery(commentId, data);
      return updatedPost;
    } catch (err) {
      throw Array.isArray(err.message) ? err.message : [err.message];
    }
  };

  const deleteComment = async (commentId) => {
    try {
      const updatedPost = await deleteCommentQuery(commentId);
      return updatedPost;
    } catch (err) {
      throw Array.isArray(err.message) ? err.message : [err.message];
    }
  };

  return { createComment, updateComment, deleteComment };
};

export default useComment;
