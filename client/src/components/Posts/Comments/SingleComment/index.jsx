import styles from './SingleComment.module.css';
import defaultProfilePic from 'assets/images/default-profile-pic.jpg';
import { formatTimeAgo } from 'utils/dates.utils';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from 'contexts/UserContext';
import EditMenu from 'components/EditMenu';

const SingleComment = ({ comment }) => {
  const { currentUser } = useContext(UserContext);
  const { user, content, createdAt, user_like_comments: likes } = comment;

  const timeAgo = formatTimeAgo(createdAt);

  return (
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
              handleEdit={() => 'setEditMode(true)'}
              handleDelete={'handleDelete'}
              iconSize='24'
            />
          )}
        </div>
        <p className={styles.content_text}>{content}</p>
      </div>
    </div>
  );
};

export default SingleComment;
