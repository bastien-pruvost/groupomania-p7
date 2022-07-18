import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from 'contexts/AuthContext';

const RequireDisconnected = ({ children }) => {
  const { currentUser } = useContext(AuthContext);

  return !currentUser.id ? children ? children : <Outlet /> : <Navigate to='/' replace />;
};

export default RequireDisconnected;
