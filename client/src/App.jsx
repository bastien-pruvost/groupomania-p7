import { useEffect, useState } from 'react';
import { UserContext } from 'contexts/UserContext';
import { getCurrentUserRequest } from 'services/auth.services';
import Header from 'components/Header';
import Routing from 'components/Routing';

const App = () => {
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

  if (isLoading) {
    return <h1>Loader</h1>;
  } else {
    return (
      <UserContext.Provider value={{ currentUser, setCurrentUser }}>
        <Header />
        <Routing />
      </UserContext.Provider>
    );
  }
};

export default App;
