import { useState, useEffect, createContext } from 'react';
import { getCurrentUserRequest } from 'services/auth.services';

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({
    id: null,
    isAdmin: false,
    firstname: '',
    lastname: '',
    profilePicPath: 'default-profile-pic.jpg'
  });
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getCurrentUserRequest()
      .then((response) => {
        console.log(response);
        setCurrentUser(response);
      })
      .catch((err) => console.log(err.message))
      .finally(() => setLoading(false));
  }, []);

  const value = { currentUser, setCurrentUser };

  if (isLoading) {
    return <h1>Loader</h1>;
  } else {
    return (
      <UserContext.Provider value={value}>{children}</UserContext.Provider>
    );
  }
};
