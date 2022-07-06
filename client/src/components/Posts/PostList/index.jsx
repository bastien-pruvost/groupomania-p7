import SinglePost from 'components/Posts/SinglePost';
import styles from './PostList.module.css';

const PostList = () => {
  return (
    <div className={styles.PostList}>
      <SinglePost />
    </div>
  );
};

export default PostList;
