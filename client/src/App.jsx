import { useEffect, useState } from 'react';
import { UserContext } from 'contexts/UserContext';
import { handleError } from 'utils/errors.utils';
import { getCurrentUserRequest } from 'services/auth.services';
import Routing from 'components/Routing';

const App = () => {
  const [currentUserId, setCurrentUserId] = useState(null);
  const [currentUserIsAdmin, setCurrentUserIsAdmin] = useState(false);
  const [isAuthLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    setAuthLoading(true);
    getCurrentUserRequest()
      .then((response) => {
        console.log(response);
        setCurrentUserId(response.userId);
        setCurrentUserIsAdmin(response.userIsAdmin);
      })
      .catch((err) => handleError(err))
      .finally(() => setAuthLoading(false));
  }, []);

  if (isAuthLoading) {
    return <h1>Loading</h1>;
  } else {
    return (
      <UserContext.Provider
        value={{
          currentUserId,
          setCurrentUserId,
          currentUserIsAdmin,
          setCurrentUserIsAdmin
        }}
      >
        <Routing />
      </UserContext.Provider>
    );
  }
};

export default App;
