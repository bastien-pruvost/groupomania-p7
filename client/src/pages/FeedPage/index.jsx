import PostForm from 'components/PostForm';
import styles from './FeedPage.module.css';

const FeedPage = () => {
  return (
    <div className={styles.FeedPage}>
      <PostForm />
    </div>
  );
};

export default FeedPage;
