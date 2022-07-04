import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { UserContext } from 'contexts/UserContext';

const RequireConnected = ({ children }) => {
  const { currentUser } = useContext(UserContext);

  if (currentUser.id) {
    return children ? children : <Outlet />;
  } else {
    return <Navigate to='/landing' replace />;
  }
};

export default RequireConnected;
