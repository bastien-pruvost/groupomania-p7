import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { UserContext } from 'contexts/UserContext';

const RequireNoAuth = ({ children }) => {
  const { currentUserId } = useContext(UserContext);

  if (!currentUserId) {
    return children ? children : <Outlet />;
  } else {
    return <Navigate to='/' replace />;
  }
};

export default RequireNoAuth;
