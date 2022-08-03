import { api } from 'utils/axios.utils';
import { handleError } from 'utils/errors.utils';

export const getUserProfileQuery = async (userId) => {
  try {
    const response = await api.get(`/profile/${userId}`);
    return response.data.userProfile;
  } catch (err) {
    handleError(err);
  }
};

export const updateUserProfileQuery = async (userId, data) => {
  try {
    const response = await api.put(`/profile/${userId}`, data);
    return response.data.userProfile;
  } catch (err) {
    handleError(err);
  }
};
