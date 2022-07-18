import Loader from 'components/Loader';
import { useAuth } from 'hooks/useAuth';
import { createContext } from 'react';

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
