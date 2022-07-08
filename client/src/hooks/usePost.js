import { useState } from 'react';
import { createPostRequest, getPaginatePostsRequest } from 'services/posts.services';

export const usePost = () => {
  const [postList, setPostList] = useState([]);
  const [page, setPage] = useState(1);
  const [lastId, setLastId] = useState(null);
  const [allPostsLoaded, setAllPostsLoaded] = useState(false);
  const limitPerPage = 8;

  const createPost = async (formData) => {
    try {
      await createPostRequest(formData);
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
      setPostList((prevPosts) => [...prevPosts, ...posts]);
      console.log(posts);
    } catch (err) {
      console.log(err);
    }
  };

  const handleInfiniteScroll = (entries) => {
    const target = entries[0];
    if (target.isIntersecting) {
      setPage((prevPage) => prevPage + 1);
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
    postList,
    setPostList,
    handleInfiniteScroll,
    getPaginatePosts,
    page,
    allPostsLoaded,
    refreshPostList
  };
};
