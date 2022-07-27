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

  const getPaginatePosts = async (id) => {
    try {
      const posts = id
        ? await getUserPaginatePostsQuery(lastPostId, limitPerPage, id)
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
    setLastPostId(null);
    setAllPostsLoaded(false);
    setPostsData([]);
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
    if (!allPostsLoaded && userId) {
      getPaginatePosts(userId);
    }
    if (!allPostsLoaded && !userId) {
      getPaginatePosts();
    }
  }, [page]);

  useEffect(() => {
    refreshPostsData();
  }, [userId]);

  return { postsData, refreshPostsData, allPostsLoaded, scrollRef };
};

export default useInfiniteScroll;
