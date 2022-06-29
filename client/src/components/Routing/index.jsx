import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useAuthVerify } from 'hooks/useAuthVerify';
import { UserContext } from 'contexts/UserContext';
import RequireNoAuth from './RequireNoAuth';
import RequireAuth from './RequireAuth';
import LandingPage from 'pages/LandingPage';
import AuthPage from 'pages/AuthPage';
import HomePage from 'pages/HomePage';
import ErrorPage from 'pages/ErrorPage';

const Routing = () => {
  const { isAuthLoading, currentUserId, setCurrentUserId } = useAuthVerify();

  if (isAuthLoading) {
    return <h1>Loading</h1>;
  } else {
    return (
      <UserContext.Provider value={{ currentUserId, setCurrentUserId }}>
        <BrowserRouter>
          <Routes>
            <Route path='/landing' element={<LandingPage />} />
            <Route element={<RequireNoAuth />}>
              <Route path='/login' element={<AuthPage loginMode={true} />} />
              <Route
                path='/register'
                element={<AuthPage loginMode={false} />}
              />
            </Route>
            <Route element={<RequireAuth />}>
              <Route path='/' element={<HomePage />} />
            </Route>
            <Route path='*' element={<ErrorPage />} />
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    );
  }
};
export default Routing;
