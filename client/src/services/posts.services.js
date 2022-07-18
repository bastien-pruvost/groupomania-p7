import { api } from 'utils/axios.utils';
import { handleError } from 'utils/errors.utils';

export const createPostQuery = async (data) => {
  try {
    const response = await api.post('/posts', data);
    return response.data;
  } catch (err) {
    handleError(err);
  }
};

export const getPaginatePostsQuery = async (lastId, limit) => {
  try {
    const response = await api.get('/posts', { params: { lastId, limit } });
    return response.data.posts;
  } catch (err) {
    handleError(err);
  }
};

export const updatePostQuery = async (postId, data) => {
  try {
    const response = await api.put(`/posts/${postId}`, data);
    return response.data.post;
  } catch (err) {
    handleError(err);
  }
};

export const deletePostQuery = async (postId) => {
  try {
    await api.delete(`/posts/${postId}`);
  } catch (err) {
    handleError(err);
  }
};

export const likePostQuery = async (postId) => {
  try {
    const response = await api.post(`/posts/like/${postId}`);
    return response.data;
  } catch (err) {
    handleError(err);
  }
};
export const dislikePostQuery = async (postId) => {
  try {
    const response = await api.post(`/posts/dislike/${postId}`);
    return response.data;
  } catch (err) {
    handleError(err);
  }
};
