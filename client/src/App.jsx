import { UserContextProvider } from 'contexts/UserContext';
import Header from 'components/Header';
import Routing from 'components/Routing';

const App = () => {
  return (
    <UserContextProvider>
      <Header />
      <Routing />
    </UserContextProvider>
  );
};

export default App;
