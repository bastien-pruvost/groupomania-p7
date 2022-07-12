import PostList from 'components/Posts/PostList';
import styles from './FeedPage.module.css';

const FeedPage = () => {
  return (
    <div className={styles.FeedPage}>
      <PostList />
    </div>
  );
};

export default FeedPage;
