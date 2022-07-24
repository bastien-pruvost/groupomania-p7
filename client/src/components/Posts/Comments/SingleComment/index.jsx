import styles from './SingleComment.module.css';
import defaultProfilePic from 'assets/images/default-profile-pic.jpg';
import { formatTimeAgo } from 'utils/dates.utils';
import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AuthContext } from 'contexts/AuthContext';
import EditMenu from 'components/EditMenu';
import CommentForm from 'components/Posts/Comments/CommentForm';
import useComment from 'hooks/useComment';
import useTextLimiter from 'hooks/useTextLimiter';

const SingleComment = ({ comment, setPostData }) => {
  const { currentUser } = useContext(AuthContext);
  const { deleteComment } = useComment();
  const [editMode, setEditMode] = useState(false);
  const { id: commentId, postId, user, content, createdAt, user_like_comments: likes } = comment;
  const { isContentLimited, textContent, handleLimitedText } = useTextLimiter({
    text: content,
    paragraphsLimit: 2,
    charactersLimit: 100
  });

  const handleDelete = () => {
    deleteComment(commentId)
      .then((res) => setPostData(res.post))
      .catch((err) => console.log(err));
  };

  const timeAgo = formatTimeAgo(createdAt);

  return editMode ? (
    <CommentForm
      commentId={commentId}
      content={content}
      postId={postId}
      setPostData={setPostData}
      setEditMode={setEditMode}
    />
  ) : (
    <div className={styles.SingleComment}>
      <Link to={`/profile/${user.id}`}>
        <img src={defaultProfilePic} alt='' className={styles.user_pic} />
      </Link>
      <div className={styles.right_column}>
        <div className={styles.top_row}>
          <div className={styles.name_time_container}>
            <Link className={styles.name_text} to={`/profile/${user.id}`}>
              {user.firstname} {user.lastname}
            </Link>
            <span className={styles.time_text}>{timeAgo}</span>
          </div>
          {comment.user.id === currentUser.id && (
            <EditMenu
              handleEdit={() => setEditMode(true)}
              handleDelete={handleDelete}
              iconSize='24'
            />
          )}
        </div>
        <p className={styles.content_text}>
          {textContent}
          {isContentLimited && (
            <button className='limit-text-btn' onClick={handleLimitedText}>
              Voir plus
            </button>
          )}
        </p>
      </div>
    </div>
  );
};

export default SingleComment;
