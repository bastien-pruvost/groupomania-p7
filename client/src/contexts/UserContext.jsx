import { useState, useEffect, createContext } from 'react';
import { getCurrentUserRequest } from 'services/auth.services';

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const noUser = {
    id: null,
    isAdmin: false,
    firstname: '',
    lastname: '',
    profilePicPath: 'default-profile-pic.jpg'
  };

  const [currentUser, setCurrentUser] = useState(noUser);
  const [isAuthLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    setAuthLoading(true);
    getCurrentUserRequest()
      .then((response) => {
        console.log(response);
        setCurrentUser(response);
      })
      .catch((err) => console.log(err.message))
      .finally(() => setAuthLoading(false));
  }, []);

  const value = { currentUser, setCurrentUser, noUser };

  if (isAuthLoading) {
    return <h1>Loader</h1>;
  } else {
    return (
      <UserContext.Provider value={value}>{children}</UserContext.Provider>
    );
  }
};
