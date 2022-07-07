import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { UserContext } from 'contexts/UserContext';

const RequireConnected = ({ children }) => {
  const { currentUser } = useContext(UserContext);

  return currentUser.id ? children ? children : <Outlet /> : <Navigate to='/landing' replace />;
};

export default RequireConnected;
