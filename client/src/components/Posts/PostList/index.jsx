import SinglePost from 'components/Posts/SinglePost';
import Loader from 'components/Loader';
import styles from './PostList.module.css';

const PostList = () => {
  return (
    <div className={styles.PostList}>
      <SinglePost />

      <div id='infiniteScrollHandler'>
        <Loader grey={true} />
      </div>
    </div>
  );
};

export default PostList;
