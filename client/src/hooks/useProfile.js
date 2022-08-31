import { AuthContext } from 'contexts/AuthContext';
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getUserProfileQuery, updateUserProfileQuery } from 'services/users.services';

const useProfile = () => {
  const { setCurrentUser, currentUser } = useContext(AuthContext);
  const [userData, setUserData] = useState({});
  const [responseErrorMsg, setResponseErrorMsg] = useState([]);
  const params = useParams();
  const userId = Number(params.userId);

  const getUserProfile = async () => {
    try {
      const userProfile = await getUserProfileQuery(userId);
      setUserData(userProfile);
    } catch (err) {
      throw Array.isArray(err.message) ? err.message : [err.message];
    }
  };

  const updateUserProfile = async (formData) => {
    try {
      const updatedProfile = await updateUserProfileQuery(userId, formData);
      setUserData(updatedProfile);
      if (userId === currentUser.id)
        setCurrentUser((prevState) => {
          const updatedCurrentUser = {
            ...prevState,
            lastname: updatedProfile.lastname,
            firstname: updatedProfile.firstname,
            profilePicPath: updatedProfile.profilePicPath
          };
          return updatedCurrentUser;
        });
    } catch (err) {
      throw Array.isArray(err.message) ? err.message : [err.message];
    }
  };

  useEffect(() => {
    getUserProfile().catch((err) => setResponseErrorMsg(err));
  }, [userId]);

  return { userData, setUserData, userId, updateUserProfile, responseErrorMsg };
};

export default useProfile;
