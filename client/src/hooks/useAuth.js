import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  signinQuery,
  signupQuery,
  signoutQuery,
  getCurrentUserQuery
} from 'services/auth.services';

export const useAuth = () => {
  const noUser = {
    id: null,
    isAdmin: false,
    firstname: '',
    lastname: '',
    profilePicPath: 'default-profile-pic.jpg'
  };
  const [currentUser, setCurrentUser] = useState(noUser);
  const [isAuthLoading, setAuthLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setAuthLoading(true);
    getCurrentUserQuery()
      .then((response) => {
        console.log(response);
        setCurrentUser(response);
      })
      .catch((err) => console.log(err.message))
      .finally(() => setAuthLoading(false));
  }, []);

  const signin = async (formData) => {
    try {
      const response = await signinQuery(formData);
      setCurrentUser(response.user);
    } catch (err) {
      throw Array.isArray(err.message) ? err.message : [err.message];
    }
  };

  const signup = async (formData) => {
    try {
      const response = await signupQuery(formData);
      setCurrentUser(response.user);
    } catch (err) {
      throw Array.isArray(err.message) ? err.message : [err.message];
    }
  };

  const signout = async () => {
    try {
      await signoutQuery();
      setCurrentUser(noUser);
      navigate('/landing');
    } catch (err) {
      console.log(err);
    }
  };

  return { signin, signup, signout, currentUser, setCurrentUser, noUser, isAuthLoading };
};
