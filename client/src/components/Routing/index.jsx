import { Routes, Route, Navigate } from 'react-router-dom';
import RequireDisconnected from './RequireDisconnected';
import RequireConnected from './RequireConnected';
import LandingPage from 'pages/LandingPage';
import AuthPage from 'pages/AuthPage';
import HomePage from 'pages/HomePage';
import ErrorPage from 'pages/ErrorPage';

const Routing = () => {
  return (
    <Routes>
      <Route path='/landing' element={<LandingPage />} />
      <Route element={<RequireDisconnected />}>
        <Route path='/signin' element={<AuthPage signinMode={true} />} />
        <Route path='/signup' element={<AuthPage signinMode={false} />} />
      </Route>
      <Route element={<RequireConnected />}>
        <Route path='/' element={<HomePage />}>
          <Route index element={<Navigate to='feed' />} />
          <Route path='feed' element={<h1>Feed</h1>} />
          <Route path='profile' element={<h1>Profil</h1>} />
        </Route>
      </Route>
      <Route path='*' element={<ErrorPage />} />
    </Routes>
  );
};

export default Routing;
