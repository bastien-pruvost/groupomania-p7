import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RequireAuth from './RequireAuth';
import LandingPage from 'pages/LandingPage';
import AuthPage from 'pages/AuthPage';
import HomePage from 'pages/HomePage';
import ErrorPage from 'pages/ErrorPage';

const Routing = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/landing' element={<LandingPage />} />
        <Route path='/login' element={<AuthPage isLoginMode={true} />} />
        <Route path='/register' element={<AuthPage isLoginMode={false} />} />
        <Route
          path='/'
          element={
            <RequireAuth>
              <HomePage />
            </RequireAuth>
          }
        />
        <Route path='*' element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
};
export default Routing;
