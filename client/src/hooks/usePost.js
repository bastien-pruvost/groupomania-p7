import {
  createPostQuery,
  deletePostQuery,
  dislikePostQuery,
  likePostQuery,
  updatePostQuery
} from 'services/posts.services';

const usePost = () => {
  const createPost = async (formData) => {
    try {
      await createPostQuery(formData);
    } catch (err) {
      throw Array.isArray(err.message) ? err.message : [err.message];
    }
  };

  const updatePost = async (postId, formData) => {
    try {
      const updatedPost = await updatePostQuery(postId, formData);
      return updatedPost;
    } catch (err) {
      throw Array.isArray(err.message) ? err.message : [err.message];
    }
  };

  const deletePost = async (postId) => {
    try {
      await deletePostQuery(postId);
    } catch (err) {
      throw Array.isArray(err.message) ? err.message : [err.message];
    }
  };

  const likePost = async (postId) => {
    try {
      const likedPost = await likePostQuery(postId);
      return likedPost;
    } catch (err) {
      throw Array.isArray(err.message) ? err.message : [err.message];
    }
  };

  const dislikePost = async (postId) => {
    try {
      const dislikedPost = await dislikePostQuery(postId);
      return dislikedPost;
    } catch (err) {
      throw Array.isArray(err.message) ? err.message : [err.message];
    }
  };

  return { createPost, updatePost, deletePost, likePost, dislikePost };
};

export default usePost;
