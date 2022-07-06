// import { useContext } from 'react';
// import { UserContext } from 'contexts/UserContext';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPostRequest } from 'services/posts.services';

export const usePost = () => {
  const [postsList, setPostsList] = useState([]);
  const navigate = useNavigate();

  const createPost = async (formData) => {
    try {
      await createPostRequest(formData);
    } catch (err) {
      throw Array.isArray(err.message) ? err.message : [err.message];
    }
  };

  return { createPost, postsList, setPostsList };
};
