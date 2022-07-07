import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { UserContext } from 'contexts/UserContext';

const RequireDisconnected = ({ children }) => {
  const { currentUser } = useContext(UserContext);

  return !currentUser.id ? children ? children : <Outlet /> : <Navigate to='/' replace />;
};

export default RequireDisconnected;
