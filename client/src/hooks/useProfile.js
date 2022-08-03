import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getUserProfileQuery, updateUserProfileQuery } from 'services/users.services';

const useProfile = () => {
  const params = useParams();
  const userId = params.userId;
  const [userData, setUserData] = useState({});

  const getUserProfile = async () => {
    try {
      const userProfile = await getUserProfileQuery(userId);
      return userProfile;
    } catch (err) {
      throw Array.isArray(err.message) ? err.message : [err.message];
    }
  };

  const updateUserProfile = async (formData) => {
    try {
      const updatedProfile = await updateUserProfileQuery(userId, formData);
      return updatedProfile;
    } catch (err) {
      throw Array.isArray(err.message) ? err.message : [err.message];
    }
  };

  useEffect(() => {
    getUserProfile(userId)
      .then((profile) => setUserData(profile))
      .catch((err) => console.log(err));
  }, [userId]);

  return { userData, setUserData, userId, updateUserProfile };
};

export default useProfile;
