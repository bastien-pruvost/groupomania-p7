import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getUserProfileQuery, updateUserProfileQuery } from 'services/users.services';

const useProfile = () => {
  const [userData, setUserData] = useState({});
  const params = useParams();
  const userId = params.userId;

  const getUserProfile = async () => {
    try {
      const userProfile = await getUserProfileQuery(userId);
      setUserData(userProfile);
    } catch (err) {
      // throw Array.isArray(err.message) ? err.message : [err.message];
      console.log(err);
    }
  };

  const updateUserProfile = async (formData) => {
    try {
      const updatedProfile = await updateUserProfileQuery(userId, formData);
      setUserData(updatedProfile);
    } catch (err) {
      throw Array.isArray(err.message) ? err.message : [err.message];
    }
  };

  useEffect(() => {
    getUserProfile();
  }, [userId]);

  return { userData, setUserData, userId, updateUserProfile };
};

export default useProfile;
