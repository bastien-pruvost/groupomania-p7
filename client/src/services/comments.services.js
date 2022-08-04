import { api } from 'utils/axios.utils';
import { handleError } from 'utils/errors.utils';

export const createCommentQuery = async (data) => {
  try {
    const response = await api.post('/comments', data);
    return response.data.post;
  } catch (err) {
    handleError(err);
  }
};

export const updateCommentQuery = async (commentId, data) => {
  try {
    const response = await api.put(`/comments/${commentId}`, data);
    return response.data.post;
  } catch (err) {
    handleError(err);
  }
};

export const deleteCommentQuery = async (commentId) => {
  try {
    const response = await api.delete(`/comments/${commentId}`);
    return response.data.post;
  } catch (err) {
    handleError(err);
  }
};
