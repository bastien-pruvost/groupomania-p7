import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getUserProfileQuery } from 'services/users.services';

const useProfile = () => {
  const params = useParams();
  const userId = params.userId;
  const [userProfile, setUserProfile] = useState({});

  const getUserProfile = async (formData) => {
    try {
      const response = await getUserProfileQuery(formData);
      return response.userProfile;
    } catch (err) {
      throw Array.isArray(err.message) ? err.message : [err.message];
    }
  };

  useEffect(() => {
    getUserProfile(userId)
      .then((profile) => setUserProfile(profile))
      .catch((err) => console.log(err));
  }, [userId]);

  return { userProfile, userId };
};

export default useProfile;
