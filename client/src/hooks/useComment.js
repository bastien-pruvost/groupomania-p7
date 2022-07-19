import { useState } from 'react';
import {
  createCommentQuery,
  deleteCommentQuery,
  updateCommentQuery
} from 'services/comments.services';

const useComment = () => {
  const createComment = async (data) => {
    try {
      const response = await createCommentQuery(data);
      return response;
    } catch (err) {
      throw Array.isArray(err.message) ? err.message : [err.message];
    }
  };

  const updateComment = async (commentId, data) => {
    try {
      const response = await updateCommentQuery(commentId, data);
      return response;
    } catch (err) {
      throw Array.isArray(err.message) ? err.message : [err.message];
    }
  };

  const deleteComment = async (commentId) => {
    try {
      const response = await deleteCommentQuery(commentId);
      return response;
    } catch (err) {
      throw Array.isArray(err.message) ? err.message : [err.message];
    }
  };

  return { createComment, updateComment, deleteComment };
};

export default useComment;
