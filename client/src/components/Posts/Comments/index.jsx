import styles from './Comments.module.css';
import { useEffect, useState } from 'react';
import SingleComment from 'components/Posts/Comments/SingleComment';
import CommentForm from 'components/Posts/Comments/CommentForm';

const Comments = ({ comments, postId, setPostData }) => {
  const [showAllComments, setShowAllComments] = useState(true);

  useEffect(() => {
    if (comments.length > 1) {
      setShowAllComments(false);
    }
  }, []);

  return (
    <div className={styles.Comments}>
      {showAllComments ? (
        comments.map((comment) => (
          <SingleComment key={comment.id} comment={comment} setPostData={setPostData} />
        ))
      ) : (
        <>
          <SingleComment comment={comments[0]} setPostData={setPostData} />
          <button
            className={`${styles.showAllBtn} limit-text-btn`}
            onClick={() => setShowAllComments(true)}
          >
            Voir tous les commentaires
          </button>
        </>
      )}

      <CommentForm postId={postId} setPostData={setPostData} />
    </div>
  );
};

export default Comments;
