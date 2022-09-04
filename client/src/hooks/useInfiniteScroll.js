import { useCallback, useEffect, useRef, useState } from 'react';
import { getPaginatePostsQuery, getUserPaginatePostsQuery } from 'services/posts.services';

const useInfiniteScroll = (userId) => {
  const [postsData, setPostsData] = useState([]);
  const [allPostsLoaded, setAllPostsLoaded] = useState(false);
  const isComponentMounted = useRef(false);
  const populatePostsRef = useRef(null);
  const scrollRef = useRef(null);
  const limitPerPage = 8;

  const populatePosts = async (args) => {
    const refreshMode = args?.refreshMode;
    const lastPostId = refreshMode ? 0 : postsData[postsData.length - 1]?.id;
    try {
      const posts = userId
        ? await getUserPaginatePostsQuery(lastPostId, limitPerPage, userId)
        : await getPaginatePostsQuery(lastPostId, limitPerPage);
      if (posts.length < limitPerPage) {
        setAllPostsLoaded(true);
      }
      const newPosts = refreshMode ? [...posts] : [...postsData, ...posts];
      setPostsData(newPosts);
    } catch (err) {
      console.log(err);
    }
  };

  populatePostsRef.current = populatePosts;

  const refreshPostsData = () => {
    setAllPostsLoaded(false);
    populatePosts({ refreshMode: true });
  };

  const handleInfiniteScroll = useCallback((entries) => {
    const target = entries[0];
    if (target.isIntersecting) {
      populatePostsRef.current();
    }
  }, []);

  useEffect(() => {
    const infiniteScrollObserver = new IntersectionObserver(handleInfiniteScroll, {
      rootMargin: '500px'
    });

    setTimeout(() => {
      if (scrollRef.current) infiniteScrollObserver.observe(scrollRef.current);
    }, 1000);

    return () => {
      infiniteScrollObserver.disconnect();
    };
  }, [allPostsLoaded]);

  useEffect(() => {
    if (isComponentMounted.current) {
      refreshPostsData();
    } else {
      isComponentMounted.current = true;
    }
  }, [userId]);

  useEffect(() => {
    populatePosts();
  }, []);

  return { postsData, refreshPostsData, allPostsLoaded, scrollRef };
};

export default useInfiniteScroll;
