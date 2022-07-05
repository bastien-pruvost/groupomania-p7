import { Routes, Route, Navigate } from 'react-router-dom';
import RequireDisconnected from './RequireDisconnected';
import RequireConnected from './RequireConnected';
import LandingPage from 'pages/LandingPage';
import AuthPage from 'pages/AuthPage';
import HomePage from 'pages/HomePage';
import ErrorPage from 'pages/ErrorPage';
import FeedPage from 'pages/HomePage/FeedPage';
import ProfilePage from 'pages/HomePage/ProfilePage';

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
          <Route path='feed' element={<FeedPage />} />
          <Route path='profile/:userId' element={<ProfilePage />} />
        </Route>
      </Route>
      <Route path='*' element={<ErrorPage />} />
    </Routes>
  );
};

export default Routing;
