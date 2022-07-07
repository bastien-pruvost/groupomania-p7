import SinglePost from 'components/Posts/SinglePost';
import Loader from 'components/Loader';
import styles from './PostList.module.css';
import { useEffect, useRef } from 'react';
import { usePost } from 'hooks/usePost';

const PostList = () => {
  const { postList, handleInfiniteScroll, getPaginatePosts, page, allPostsLoaded } = usePost();
  const scroll = useRef(null);

  useEffect(() => {
    const scrollRef = scroll.current;
    const infiniteScrollObserver = new IntersectionObserver(handleInfiniteScroll);
    setTimeout(() => {
      if (scrollRef) infiniteScrollObserver.observe(scrollRef);
    }, 1500);
    return () => {
      infiniteScrollObserver.unobserve(scrollRef);
    };
  }, []);

  useEffect(() => {
    if (!allPostsLoaded) getPaginatePosts();
  }, [page]);

  return (
    <div className={styles.PostList}>
      {postList.map((post) => (
        <SinglePost key={post.id} post={post} />
      ))}

      {allPostsLoaded ? (
        <p className={styles.end_message}>Il n'y a pas de posts plus anciens...</p>
      ) : (
        <Loader grey={true} />
      )}
      <div ref={scroll} />
    </div>
  );
};

export default PostList;
