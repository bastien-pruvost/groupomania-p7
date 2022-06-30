import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import RequireNoAuth from './RequireNoAuth';
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
        <Route element={<RequireNoAuth />}>
          <Route path='/signin' element={<AuthPage signinMode={true} />} />
          <Route path='/signup' element={<AuthPage signinMode={false} />} />
        </Route>
        <Route element={<RequireAuth />}>
          <Route path='/' element={<HomePage />}>
            <Route index element={<Navigate to='feed' />} />
            <Route path='feed' element={<h1>Installation</h1>} />
            <Route path='profile' element={<h1>Fondamentaux</h1>} />
            <Route path='hooks' element={<h1>Hooks</h1>} />
          </Route>
        </Route>
        <Route path='*' element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routing;
