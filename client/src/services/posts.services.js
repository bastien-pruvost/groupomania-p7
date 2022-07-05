import { api } from 'utils/axios.utils';
import { handleError } from 'utils/errors.utils';

export const createPostRequest = async () => {
  try {
    const response = await api.post('/posts');
    return response.data;
  } catch (err) {
    handleError(err);
  }
};
