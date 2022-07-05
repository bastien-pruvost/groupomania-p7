import styles from './PostContainer.module.css';

const PostContainer = ({ children }) => {
  return <div className={styles.PostContainer}>{children}</div>;
};

export default PostContainer;
