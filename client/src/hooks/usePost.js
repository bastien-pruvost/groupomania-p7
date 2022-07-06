import { useState } from 'react';
import { createPostRequest } from 'services/posts.services';

export const usePost = () => {
  const [postsList, setPostsList] = useState([]);

  const createPost = async (formData) => {
    try {
      await createPostRequest(formData);
    } catch (err) {
      throw Array.isArray(err.message) ? err.message : [err.message];
    }
  };

  return { createPost, postsList, setPostsList };
};
