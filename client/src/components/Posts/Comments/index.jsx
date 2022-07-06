import CommentForm from 'components/Posts/Comments/CommentForm';
import styles from './Comments.module.css';

const Comments = () => {
  return (
    <div className={styles.Comments}>
      <CommentForm />
      <p></p>
    </div>
  );
};

export default Comments;
