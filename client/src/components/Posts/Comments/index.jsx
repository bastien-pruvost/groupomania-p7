import CommentForm from 'components/Posts/Comments/CommentForm';
import SingleComment from 'components/Posts/Comments/SingleComment';
import styles from './Comments.module.css';

const Comments = ({ comments, postId, setUpdatedPost }) => {
  return (
    <div className={styles.Comments}>
      {comments.map((comment) => (
        <SingleComment key={comment.id} comment={comment} />
      ))}
      <CommentForm postId={postId} setUpdatedPost={setUpdatedPost} />
    </div>
  );
};

export default Comments;
