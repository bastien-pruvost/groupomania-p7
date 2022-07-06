import PostForm from 'components/Posts/PostForm';
import PostList from 'components/Posts/PostList';
import styles from './FeedPage.module.css';

const FeedPage = () => {
  return (
    <div className={styles.FeedPage}>
      <PostForm />
      <PostList />
    </div>
  );
};

export default FeedPage;
