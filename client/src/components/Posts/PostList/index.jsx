import styles from './PostList.module.css';
import usePost from 'hooks/usePost';
import SinglePost from 'components/Posts/SinglePost';
import Loader from 'components/Loader';

const PostList = ({ postsData, allPostsLoaded, refreshPostsData, scrollRef }) => {
  return (
    <div className={styles.PostList}>
      {postsData.map((post) => (
        <SinglePost key={post.id} post={post} refreshPostsData={refreshPostsData} />
      ))}

      {allPostsLoaded ? (
        <p className={styles.endMessage}>
          {postsData.length === 0
            ? `Il n'y a aucun posts par ici...`
            : `Il n'y a pas de posts plus anciens...`}
        </p>
      ) : (
        <>
          <div ref={scrollRef} />
          <Loader grey />
        </>
      )}
    </div>
  );
};

export default PostList;
