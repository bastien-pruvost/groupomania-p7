import styles from './SinglePost.module.css';
import { memo, useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import usePost from 'hooks/usePost';
import useTextLimiter from 'hooks/useTextLimiter';
import { formatTimeAgo } from 'utils/dates.utils';
import { AuthContext } from 'contexts/AuthContext';
import PostForm from 'components/Posts/PostForm';
import PostContainer from 'components/Posts/PostContainer';
import EditMenu from 'components/EditMenu';
import Comments from 'components/Posts/Comments';
import IconLike from 'components/Icons/IconLike';
import IconComment from 'components/Icons/IconComment';
import defaultProfilePic from 'assets/images/default-profile-pic.jpg';
import randomPic from 'assets/images/random-pic.jpg';

const SinglePost = ({ post, refreshPostsData }) => {
  const { currentUser } = useContext(AuthContext);
  const [postData, setPostData] = useState(post);
  const [editMode, setEditMode] = useState(false);
  const [postLikedByUser, setPostLikedByUser] = useState(false);
  const [isCommentsOpen, setCommentsOpen] = useState(false);
  const { likePost, dislikePost, deletePost } = usePost();
  const {
    id: postId,
    content,
    imagePath: postPicPath,
    user,
    createdAt,
    user_like_posts: likes,
    comments
  } = postData;
  const { isContentLimited, textContent, handleLimitedText } = useTextLimiter({
    text: content,
    paragraphsLimit: 3,
    charactersLimit: 400
  });

  const allowEdit = currentUser.id === post.user.id || currentUser.isAdmin;

  const profilePicUrl = user.profilePicPath
    ? `${process.env.REACT_APP_IMAGES_URL}/${user.profilePicPath}`
    : defaultProfilePic;
  const postPicUrl = postPicPath ? `${process.env.REACT_APP_IMAGES_URL}/${postPicPath}` : null;
  // const postPicUrl = postPicPath ? randomPic : null;
  const timeAgoText = formatTimeAgo(createdAt);
  const numberOfLikes = `${likes.length} J'aime`;
  const numberOfComments = `${comments.length} ${
    comments.length > 1 ? 'commentaires' : 'commentaire'
  }`;

  const checkPostLikedByUser = () => {
    setPostLikedByUser(false);
    if (likes.length > 0) {
      likes.forEach((like) => {
        if (like.user.id === currentUser.id) {
          return setPostLikedByUser(true);
        }
      });
    }
  };

  const handleDelete = () => {
    deletePost(postId)
      .then(() => refreshPostsData())
      .catch((err) => console.log(err));
  };

  const handleLike = () => {
    likePost(postId)
      .then((updatedPost) => setPostData(updatedPost))
      .catch((err) => console.log(err));
  };

  const handleDislike = () => {
    dislikePost(postId)
      .then((updatedPost) => setPostData(updatedPost))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    checkPostLikedByUser();
    if (comments.length > 0) setCommentsOpen(true);
  }, [postData]);

  if (editMode) {
    return (
      <PostForm
        postId={postId}
        content={content}
        postPicPath={postPicPath}
        postAuthor={user}
        editMode={editMode}
        setEditMode={setEditMode}
        setPostData={setPostData}
      />
    );
  }

  return (
    <PostContainer>
      <article className={styles.SinglePost}>
        <div className={styles.topRow}>
          <Link to={`/profile/${user.id}`}>
            <img className={styles.userPic} src={profilePicUrl} alt='Photo de profil' />
          </Link>

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
              iconSize='30'
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

        {!!postPicUrl && <img className={styles.image} src={postPicUrl} />}

        <div>
          <div className={styles.countsRow}>
            <span>{numberOfLikes}</span>
            <span>{numberOfComments}</span>
          </div>

          <div className={styles.interactionRow}>
            <button
              className={styles.interactionButton}
              onClick={postLikedByUser ? handleDislike : handleLike}
            >
              <IconLike active={postLikedByUser} size='22' />
              <span className={postLikedByUser ? styles.likeBtnActive : ''}>J'aime</span>
            </button>
            <button className={styles.interactionButton} onClick={() => setCommentsOpen(true)}>
              <IconComment size='22' />
              <span>Commenter</span>
            </button>
          </div>
        </div>

        {isCommentsOpen && (
          <Comments comments={comments} postId={postId} setPostData={setPostData} />
        )}
      </article>
    </PostContainer>
  );
};

export default memo(SinglePost);
