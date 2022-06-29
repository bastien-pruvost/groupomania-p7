import { useState, useEffect } from 'react';
import { api } from 'utils/axios.utils';
import { handleError } from 'utils/errors.utils';

export const useAuthVerify = () => {
  const [currentUserId, setCurrentUserId] = useState(null);
  const [isAuthLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    async function getUserId() {
      try {
        setAuthLoading(true);
        const response = await api.get('/users/jwtid');
        setCurrentUserId(response.data.userId);
      } catch (err) {
        handleError(err);
      } finally {
        setAuthLoading(false);
      }
    }
    getUserId();
  }, []);

  return { currentUserId, setCurrentUserId, isAuthLoading };
};
