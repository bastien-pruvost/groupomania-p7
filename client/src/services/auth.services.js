import { api } from 'utils/axios.utils';
import { handleError } from 'utils/errors.utils';

export const getCurrentUserRequest = async () => {
  const response = await api.get('/users/verifyauth');
  return response.data;
};

export const signinRequest = async (data) => {
  try {
    const response = await api.post('/users/signin', data);
    return response.data;
  } catch (err) {
    const errorData = handleError(err);
    throw errorData;
  }
};

export const signoutRequest = async () => {
  try {
    const response = await api.get('/users/signout');
    return response.data;
  } catch (err) {
    const errorData = handleError(err);
    throw errorData;
  }
};

export const signupRequest = async (data) => {
  try {
    const response = await api.post('/users/signup', data);
    return response.data;
  } catch (err) {
    const errorData = handleError(err);
    throw errorData;
  }
};
