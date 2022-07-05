import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { UserContext } from 'contexts/UserContext';

const RequireDisconnected = ({ children }) => {
  const { currentUser } = useContext(UserContext);

  if (!currentUser.id) {
    return children ? children : <Outlet />;
  }

  return <Navigate to='/' replace />;
};

export default RequireDisconnected;
