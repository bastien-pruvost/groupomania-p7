import { api } from 'utils/axios.utils';
import { handleError } from 'utils/errors.utils';

export const getUserProfileQuery = async (userId) => {
  try {
    const response = await api.get(`/profile/${userId}`);
    return response.data;
  } catch (err) {
    handleError(err);
  }
};
