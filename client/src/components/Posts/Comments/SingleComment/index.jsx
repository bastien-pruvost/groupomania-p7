import styles from './SingleComment.module.css';
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import useComment from 'hooks/useComment';
import useTextLimiter from 'hooks/useTextLimiter';
import { formatTimeAgo } from 'utils/dates.utils';
import { AuthContext } from 'contexts/AuthContext';
import CommentForm from 'components/Posts/Comments/CommentForm';
import EditMenu from 'components/EditMenu';
import defaultProfilePic from 'assets/images/default-profile-pic.jpg';

const SingleComment = ({ comment, setPostData }) => {
  const { currentUser } = useContext(AuthContext);
  const [editMode, setEditMode] = useState(false);
  const { deleteComment } = useComment();
  const { id: commentId, postId, user, content, createdAt, user_like_comments: likes } = comment;
  const { isContentLimited, textContent, handleLimitedText } = useTextLimiter({
    text: content,
    paragraphsLimit: 2,
    charactersLimit: 100
  });

  const allowEdit = currentUser.id === user.id || currentUser.isAdmin;

  const timeAgoText = formatTimeAgo(createdAt);
  const profilePicUrl = user.profilePicPath
    ? `${process.env.REACT_APP_IMAGES_URL}/${user.profilePicPath}`
    : defaultProfilePic;

  const handleDelete = () => {
    deleteComment(commentId)
      .then((updatedPost) => setPostData(updatedPost))
      .catch((err) => console.log(err));
  };

  if (editMode) {
    return (
      <CommentForm
        commentId={commentId}
        content={content}
        postId={postId}
        editMode={editMode}
        setEditMode={setEditMode}
        setPostData={setPostData}
      />
    );
  }

  return (
    <div className={styles.SingleComment}>
      <Link to={`/profile/${user.id}`}>
        <img src={profilePicUrl} alt='' className={styles.userPic} />
      </Link>
      <div className={styles.rightColumn}>
        <div className={styles.topRow}>
          <div className={styles.nameTimeContainer}>
            <Link className={styles.nameText} to={`/profile/${user.id}`}>
              {user.firstname} {user.lastname}
            </Link>
            <span className={styles.timeText}>{timeAgoText}</span>
          </div>
          {allowEdit && (
            <EditMenu
              handleEdit={() => setEditMode(true)}
              handleDelete={handleDelete}
              iconSize='24'
            />
          )}
        </div>
        <p className={styles.contentText}>
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
