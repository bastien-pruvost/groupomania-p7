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
