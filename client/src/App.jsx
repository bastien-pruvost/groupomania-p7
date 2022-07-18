import { AuthContextProvider } from 'contexts/AuthContext';
import Header from 'components/Header';
import Routing from 'components/Routing';

const App = () => {
  return (
    <AuthContextProvider>
      <Header />
      <Routing />
    </AuthContextProvider>
  );
};

export default App;
