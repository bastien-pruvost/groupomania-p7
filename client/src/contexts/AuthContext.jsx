import { createContext } from 'react';
import useAuth from 'hooks/useAuth';
import Loader from 'components/Loader';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const { signin, signup, signout, currentUser, setCurrentUser, noUser, isAuthLoading } = useAuth();

  const value = { signin, signup, signout, currentUser, setCurrentUser, noUser, isAuthLoading };

  if (isAuthLoading) {
    return <Loader />;
  } else {
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
  }
};
