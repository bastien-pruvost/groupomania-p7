import { useRef, useState } from 'react';
import {
  createPostRequest,
  deletePostRequest,
  getPaginatePostsRequest,
  updatePostRequest
} from 'services/posts.services';

export const usePost = () => {
  const [postList, setPostList] = useState([]);
  const [page, setPage] = useState(1);
  const pageRef = useRef();
  const [lastId, setLastId] = useState(null);
  const [allPostsLoaded, setAllPostsLoaded] = useState(false);
  const limitPerPage = 8;
  pageRef.current = page;

  const createPost = async (formData) => {
    try {
      await createPostRequest(formData);
    } catch (err) {
      throw Array.isArray(err.message) ? err.message : [err.message];
    }
  };

  const updatePost = async (postId, formData) => {
    try {
      const updatedPost = await updatePostRequest(postId, formData);
      return updatedPost;
    } catch (err) {
      throw Array.isArray(err.message) ? err.message : [err.message];
    }
  };

  const deletePost = async (postId) => {
    try {
      await deletePostRequest(postId);
    } catch (err) {
      throw Array.isArray(err.message) ? err.message : [err.message];
    }
  };

  const getPaginatePosts = async () => {
    try {
      const posts = await getPaginatePostsRequest(lastId, limitPerPage);
      if (posts.length < limitPerPage) {
        setAllPostsLoaded(true);
      } else {
        setLastId(posts[posts.length - 1].id);
      }
      const newPosts = [...postList, ...posts];
      setPostList(newPosts);
      console.log(newPosts);
    } catch (err) {
      console.log(err);
    }
  };

  const handleInfiniteScroll = (entries) => {
    const target = entries[0];
    if (target.isIntersecting) {
      setPage(pageRef.current + 1);
    }
  };

  const refreshPostList = () => {
    setLastId(null);
    setAllPostsLoaded(false);
    setPostList([]);
    setPage(1);
  };

  return {
    createPost,
    updatePost,
    deletePost,
    postList,
    setPostList,
    getPaginatePosts,
    handleInfiniteScroll,
    page,
    allPostsLoaded,
    refreshPostList
  };
};
