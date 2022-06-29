import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from 'contexts/UserContext';

const RequireAuth = ({ children }) => {
  const { currentUserId, setCurrentUserId } = useContext(UserContext);
  console.log(currentUserId);

  return currentUserId ? children : <Navigate to='/login' replace />;
};
export default RequireAuth;
