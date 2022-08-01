import SinglePost from 'components/Posts/SinglePost';
import Loader from 'components/Loader';
import styles from './PostList.module.css';
import usePost from 'hooks/usePost';

const PostList = ({ postsData, allPostsLoaded, refreshPostsData, scrollRef }) => {
  const { deletePost } = usePost();

  return (
    <div className={styles.PostList}>
      {postsData.map((post) => (
        <SinglePost
          key={post.id}
          post={post}
          deletePost={deletePost}
          refreshPostsData={refreshPostsData}
        />
      ))}

      {allPostsLoaded ? (
        <p className={styles.endMessage}>Il n'y a pas de posts plus anciens...</p>
      ) : (
        <>
          <Loader grey={true} />
          <div ref={scrollRef} />
        </>
      )}
    </div>
  );
};

export default PostList;
