import styles from './Comments.module.css';
import { useState } from 'react';
import SingleComment from 'components/Posts/Comments/SingleComment';
import CommentForm from 'components/Posts/Comments/CommentForm';

const Comments = ({ comments, postId, setPostData }) => {
  const [allCommentsShown, setAllCommentsShown] = useState(comments.length < 2);

  return (
    <div className={styles.Comments}>
      {allCommentsShown ? (
        comments.map((comment) => (
          <SingleComment key={comment.id} comment={comment} setPostData={setPostData} />
        ))
      ) : (
        <>
          <SingleComment comment={comments[0]} setPostData={setPostData} />
          <button
            className={`${styles.showAllBtn} limit-text-btn`}
            onClick={() => setAllCommentsShown(true)}
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
