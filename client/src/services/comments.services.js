import { api } from 'utils/axios.utils';
import { handleError } from 'utils/errors.utils';

export const createCommentQuery = async (data) => {
  try {
    const response = await api.post('/comments', data);
    return response.data;
  } catch (err) {
    handleError(err);
  }
};
