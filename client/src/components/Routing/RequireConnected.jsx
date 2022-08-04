import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from 'contexts/AuthContext';

const RequireConnected = ({ children }) => {
  const { currentUser } = useContext(AuthContext);

  if (currentUser.id) {
    return children ? children : <Outlet />;
  } else {
    return <Navigate to='/signin' replace />;
  }
};

export default RequireConnected;
