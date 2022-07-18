import {
  createPostQuery,
  deletePostQuery,
  dislikePostQuery,
  likePostQuery,
  updatePostQuery
} from 'services/posts.services';

export const usePost = () => {
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
      const response = await likePostQuery(postId);
      return response;
    } catch (err) {
      throw Array.isArray(err.message) ? err.message : [err.message];
    }
  };

  const dislikePost = async (postId) => {
    try {
      const response = await dislikePostQuery(postId);
      return response;
    } catch (err) {
      throw Array.isArray(err.message) ? err.message : [err.message];
    }
  };

  return { createPost, updatePost, deletePost, likePost, dislikePost };
};
