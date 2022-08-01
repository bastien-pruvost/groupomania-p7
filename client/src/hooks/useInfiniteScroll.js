import { useEffect, useRef, useState } from 'react';
import { getPaginatePostsQuery, getUserPaginatePostsQuery } from 'services/posts.services';

const useInfiniteScroll = (userId) => {
  const [postsData, setPostsData] = useState([]);
  const [lastPostId, setLastPostId] = useState(null);
  const [allPostsLoaded, setAllPostsLoaded] = useState(false);
  const [page, setPage] = useState(1);
  const scrollRef = useRef(null);
  const pageRef = useRef(null);
  pageRef.current = page;

  const limitPerPage = 8;

  const getPaginatePosts = async () => {
    try {
      const posts = userId
        ? await getUserPaginatePostsQuery(lastPostId, limitPerPage, userId)
        : await getPaginatePostsQuery(lastPostId, limitPerPage);
      if (posts.length === 0) {
        setAllPostsLoaded(true);
      } else {
        setLastPostId(posts[posts.length - 1].id);
      }
      const newPosts = [...postsData, ...posts];
      setPostsData(newPosts);
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

  const refreshPostsData = () => {
    setAllPostsLoaded(false);
    setPostsData([]);
    setLastPostId(null);
    setPage((prevPage) => {
      if (prevPage === 1) return 0;
      return 1;
    });
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
    refreshPostsData();
  }, [userId]);

  useEffect(() => {
    if (!allPostsLoaded) getPaginatePosts();
  }, [page]);

  return { postsData, refreshPostsData, allPostsLoaded, scrollRef };
};

export default useInfiniteScroll;
