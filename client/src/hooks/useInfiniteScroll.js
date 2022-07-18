import { useEffect, useRef, useState } from 'react';
import { getPaginatePostsQuery } from 'services/posts.services';

export const useInfiniteScroll = () => {
  const [postList, setPostList] = useState([]);
  const [lastId, setLastId] = useState(null);
  const [allPostsLoaded, setAllPostsLoaded] = useState(false);
  const [page, setPage] = useState(1);
  const scrollRef = useRef(null);
  const pageRef = useRef(null);
  pageRef.current = page;

  const limitPerPage = 8;

  const getPaginatePosts = async () => {
    try {
      const posts = await getPaginatePostsQuery(lastId, limitPerPage);
      console.log(posts);
      if (posts.length < limitPerPage) {
        setAllPostsLoaded(true);
      } else {
        setLastId(posts[posts.length - 1].id);
      }
      const newPosts = [...postList, ...posts];
      setPostList(newPosts);
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

  useEffect(() => {
    const currentScrollRef = scrollRef.current;
    const infiniteScrollObserver = new IntersectionObserver(handleInfiniteScroll);
    setTimeout(() => {
      if (currentScrollRef) infiniteScrollObserver.observe(currentScrollRef);
    }, 1500);
    return () => {
      infiniteScrollObserver.unobserve(currentScrollRef);
    };
  }, []);

  useEffect(() => {
    if (!allPostsLoaded) getPaginatePosts();
  }, [page]);

  return { postList, refreshPostList, allPostsLoaded, scrollRef };
};
