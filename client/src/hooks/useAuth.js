import { useContext } from 'react';
import { UserContext } from 'contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import { signinRequest, signupRequest, signoutRequest } from 'services/auth.services';

export const useAuth = () => {
  const { currentUser, setCurrentUser, noUser } = useContext(UserContext);
  const navigate = useNavigate();

  const signin = async (formData) => {
    try {
      const response = await signinRequest(formData);
      setCurrentUser(response.user);
    } catch (err) {
      throw Array.isArray(err.message) ? err.message : [err.message];
    }
  };

  const signup = async (formData) => {
    try {
      const response = await signupRequest(formData);
      setCurrentUser(response.user);
    } catch (err) {
      throw Array.isArray(err.message) ? err.message : [err.message];
    }
  };

  const signout = async () => {
    try {
      await signoutRequest();
      setCurrentUser(noUser);
      navigate('/landing');
    } catch (err) {
      console.log(err);
    }
  };

  return { signin, signup, signout, currentUser, noUser };
};
