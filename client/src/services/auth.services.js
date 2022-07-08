import { api } from 'utils/axios.utils';
import { handleError } from 'utils/errors.utils';

export const getCurrentUserRequest = async () => {
  try {
    const response = await api.get('/auth/getcurrentuser');
    return response.data;
  } catch (err) {
    handleError(err);
  }
};

export const signinRequest = async (data) => {
  try {
    const response = await api.post('/auth/signin', data);
    return response.data;
  } catch (err) {
    handleError(err);
  }
};

export const signoutRequest = async () => {
  try {
    const response = await api.get('/auth/signout');
    return response.data;
  } catch (err) {
    handleError(err);
  }
};

export const signupRequest = async (data) => {
  try {
    const response = await api.post('/auth/signup', data);
    return response.data;
  } catch (err) {
    handleError(err);
  }
};
