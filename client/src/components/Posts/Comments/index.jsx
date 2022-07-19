import CommentForm from 'components/Posts/Comments/CommentForm';
import SingleComment from 'components/Posts/Comments/SingleComment';
import { useEffect, useState } from 'react';
import styles from './Comments.module.css';

const Comments = ({ comments, postId, setPostData }) => {
  const [showAllComments, setShowAllComments] = useState(false);
  useEffect(() => {
    if (comments.length <= 1) {
      setShowAllComments(true);
    }
  }, []);

  return (
    <div className={styles.Comments}>
      {showAllComments ? (
        comments.map((comment) => (
          <SingleComment key={comment.id} comment={comment} setPostData={setPostData} />
        ))
      ) : (
        <SingleComment comment={comments[0]} setPostData={setPostData} />
      )}

      {!showAllComments && (
        <button
          className={`${styles.show_all_btn} limit-text-btn`}
          onClick={() => setShowAllComments(true)}
        >
          Voir tous les commentaires
        </button>
      )}

      <CommentForm postId={postId} setPostData={setPostData} />
    </div>
  );
};

export default Comments;
