import SinglePost from 'components/Posts/SinglePost';
import Loader from 'components/Loader';
import styles from './PostList.module.css';
import { useEffect, useRef } from 'react';
import { usePost } from 'hooks/usePost';
import PostForm from 'components/Posts/PostForm';

const PostList = () => {
  const {
    postList,
    getPaginatePosts,
    handleInfiniteScroll,
    page,
    allPostsLoaded,
    deletePost,
    refreshPostList
  } = usePost();
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
      <PostForm refreshPostList={refreshPostList} />

      {postList.map((post) => (
        <SinglePost
          key={post.id}
          post={post}
          deletePost={deletePost}
          refreshPostList={refreshPostList}
        />
      ))}

      {allPostsLoaded ? (
        <p className={styles.end_message}>Il n'y a pas de posts plus anciens...</p>
      ) : (
        <>
          <div ref={scroll} />
          <Loader grey={true} />
        </>
      )}
    </div>
  );
};

export default PostList;
