import { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { UserContext } from 'contexts/UserContext';
import { getCurrentUserRequest } from 'services/auth.services';
import Header from 'components/Header';
import Routing from 'components/Routing';

const App = () => {
  const [currentUserId, setCurrentUserId] = useState(null);
  const [currentUserIsAdmin, setCurrentUserIsAdmin] = useState(false);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getCurrentUserRequest()
      .then((response) => {
        console.log(response);
        setCurrentUserId(response.userId);
        setCurrentUserIsAdmin(response.userIsAdmin);
      })
      .catch((err) => console.log(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (isLoading) {
    return <h1>Loader</h1>;
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
        <BrowserRouter>
          <Header />
          <Routing />
        </BrowserRouter>
      </UserContext.Provider>
    );
  }
};

export default App;
