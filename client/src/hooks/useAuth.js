import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  signinQuery,
  signupQuery,
  signoutQuery,
  getConnectedUserQuery
} from 'services/auth.services';

const useAuth = () => {
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

  const signin = async (formData) => {
    try {
      const user = await signinQuery(formData);
      setCurrentUser(user);
    } catch (err) {
      throw Array.isArray(err.message) ? err.message : [err.message];
    }
  };

  const signup = async (formData) => {
    try {
      const user = await signupQuery(formData);
      setCurrentUser(user);
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

  const getConnectedUser = async () => {
    setAuthLoading(true);
    getConnectedUserQuery()
      .then((connectedUser) => setCurrentUser(connectedUser))
      .catch((err) => console.log(err.message))
      .finally(() => setAuthLoading(false));
  };

  useEffect(() => {
    getConnectedUser();
  }, []);

  return { signin, signup, signout, currentUser, setCurrentUser, noUser, isAuthLoading };
};

export default useAuth;
