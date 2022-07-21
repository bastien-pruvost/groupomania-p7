import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getUserProfileQuery } from 'services/users.services';

const useProfile = () => {
  const [userProfile, setUserProfile] = useState({});
  const params = useParams();
  const userId = params.userId;

  const getUserProfile = async (formData) => {
    try {
      const response = await getUserProfileQuery(formData);
      console.log(response.userProfile);
      return response.userProfile;
    } catch (err) {
      throw Array.isArray(err.message) ? err.message : [err.message];
    }
  };

  useEffect(() => {
    getUserProfile(userId)
      .then((profile) => setUserProfile(profile))
      .catch((err) => console.log(err));
  }, []);

  return { userProfile };
};

export default useProfile;
