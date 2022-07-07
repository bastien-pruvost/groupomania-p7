import { api } from 'utils/axios.utils';
import { handleError } from 'utils/errors.utils';

export const createPostRequest = async (data) => {
  try {
    const response = await api.post('/posts', data);
    return response.data;
  } catch (err) {
    handleError(err);
  }
};

export const getPaginatePostsRequest = async (lastId, limit) => {
  try {
    const response = await api.get('/posts', {
      params: { lastId, limit }
    });
    return response.data.posts;
  } catch (err) {
    handleError(err);
  }
};
