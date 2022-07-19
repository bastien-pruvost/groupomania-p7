import SinglePost from 'components/Posts/SinglePost';
import Loader from 'components/Loader';
import styles from './PostList.module.css';
import usePost from 'hooks/usePost';
import PostForm from 'components/Posts/PostForm';
import useInfiniteScroll from 'hooks/useInfiniteScroll';

const PostList = () => {
  const { postList, allPostsLoaded, refreshPostList, scrollRef } = useInfiniteScroll();
  const { deletePost } = usePost();

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
          <div ref={scrollRef} />
          <Loader grey={true} />
        </>
      )}
    </div>
  );
};

export default PostList;
