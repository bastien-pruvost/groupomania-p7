import { useState } from 'react';
import { createCommentRequest } from 'services/comments.services';

export const useComment = () => {
  const createComment = async (data) => {
    try {
      const response = await createCommentRequest(data);
      return response;
    } catch (err) {
      throw Array.isArray(err.message) ? err.message : [err.message];
    }
  };

  return { createComment };
};
