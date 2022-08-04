import { api } from 'utils/axios.utils';
import { handleError } from 'utils/errors.utils';

export const getConnectedUserQuery = async () => {
  try {
    const response = await api.get('/auth/getcurrentuser');
    return response.data;
  } catch (err) {
    handleError(err);
  }
};

export const signinQuery = async (data) => {
  try {
    const response = await api.post('/auth/signin', data);
    return response.data.user;
  } catch (err) {
    handleError(err);
  }
};

export const signupQuery = async (data) => {
  try {
    const response = await api.post('/auth/signup', data);
    return response.data.user;
  } catch (err) {
    handleError(err);
  }
};

export const signoutQuery = async () => {
  try {
    const response = await api.get('/auth/signout');
    return response.data;
  } catch (err) {
    handleError(err);
  }
};
