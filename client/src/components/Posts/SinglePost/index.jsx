import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { formatTimeAgo } from 'utils/dates.utils';
import styles from './SinglePost.module.css';
import PostContainer from 'components/Posts/PostContainer';
import Comments from 'components/Posts/Comments';
import defaultProfilePic from 'assets/images/default-profile-pic.jpg';
import randomPic from 'assets/images/random-pic.jpg';
import IconLike from 'components/Icons/IconLike';
import IconComment from 'components/Icons/IconComment';
import PostForm from 'components/Posts/PostForm';
import { AuthContext } from 'contexts/AuthContext';
import EditMenu from 'components/EditMenu';
import usePost from 'hooks/usePost';
import useTextLimiter from 'hooks/useTextLimiter';

const SinglePost = ({ post, deletePost, refreshPostsData }) => {
  const { currentUser } = useContext(AuthContext);
  const { likePost, dislikePost } = usePost();
  const [editMode, setEditMode] = useState(false);
  const [postLikedByUser, setPostLikedByUser] = useState(false);
  const [isCommentsOpen, setCommentsOpen] = useState(false);
  const [postData, setPostData] = useState(post);
  const {
    id: postId,
    content,
    imagePath,
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
  const profilePicUrl = user.profilePicPath
    ? `${process.env.REACT_APP_IMAGES_URL}/${user.profilePicPath}`
    : defaultProfilePic;

  const handleDelete = () => {
    deletePost(postId)
      .then(() => refreshPostsData())
      .catch((err) => console.log(err));
  };

  const handleLike = () => {
    likePost(postId)
      .then((res) => {
        setPostData(res.post);
      })
      .catch((err) => console.log(err));
  };

  const handleDislike = () => {
    dislikePost(postId)
      .then((res) => {
        setPostData(res.post);
      })
      .catch((err) => console.log(err));
  };

  const checkPostLikedByUser = () => {
    if (likes.length === 0) {
      return setPostLikedByUser(false);
    }
    likes.forEach((like) => {
      if (like.user.id === currentUser.id) {
        return setPostLikedByUser(true);
      }
    });
  };

  const handleComments = () => {
    setCommentsOpen(true);
  };

  useEffect(() => {
    if (comments.length > 0) setCommentsOpen(true);
    checkPostLikedByUser();
  }, [postData]);

  const imageUrl = randomPic;
  // const imageUrl = imagePath ? `${process.env.REACT_APP_IMAGES_URL}/${imagePath}` : null;
  const timeAgo = formatTimeAgo(createdAt);
  const numberOfLikes = `${likes.length} J'aime`;
  const numberOfComments = `${comments.length} ${
    comments.length > 1 ? 'commentaires' : 'commentaire'
  }`;

  return editMode ? (
    <PostForm
      postId={postId}
      content={content}
      imagePath={imagePath}
      editMode={editMode}
      setEditMode={setEditMode}
      setPostData={setPostData}
    />
  ) : (
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
            <span className={styles.timeText}>{timeAgo}</span>
          </div>

          {post.user.id === currentUser.id && (
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

        {!!imageUrl && <img className={styles.image} src={imageUrl} />}

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
            <button className={styles.interactionButton} onClick={handleComments}>
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

export default SinglePost;
