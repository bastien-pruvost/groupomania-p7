import CommentForm from 'components/Posts/Comments/CommentForm';
import SingleComment from 'components/Posts/Comments/SingleComment';
import styles from './Comments.module.css';

const Comments = ({ comments, postId, setPostData }) => {
  return (
    <div className={styles.Comments}>
      {comments.map((comment) => (
        <SingleComment key={comment.id} comment={comment} setPostData={setPostData} />
      ))}
      <CommentForm postId={postId} setPostData={setPostData} />
    </div>
  );
};

export default Comments;
