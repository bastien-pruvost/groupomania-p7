import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { formatTimeAgo } from 'utils/dates.utils';
import styles from './SinglePost.module.css';
import PostContainer from 'components/Posts/PostContainer';
import Comments from 'components/Posts/Comments';
import defaultProfilePic from 'assets/images/default-profile-pic.jpg';
// import randomPic from 'assets/images/random-pic.jpg';
import IconLike from 'components/Icons/IconLike';
import IconComment from 'components/Icons/IconComment';
import PostForm from 'components/Posts/PostForm';
import { AuthContext } from 'contexts/AuthContext';
import EditMenu from 'components/EditMenu';

const SinglePost = ({ post, deletePost, refreshPostList }) => {
  const { currentUser } = useContext(AuthContext);
  const [editMode, setEditMode] = useState(false);
  const [updatedPost, setUpdatedPost] = useState(null);
  const {
    user,
    createdAt,
    user_like_posts: likes,
    imagePath,
    content,
    comments
  } = updatedPost || post;
  const [isCommentsOpen, setCommentsOpen] = useState(false);
  const [userLikePost, setUserLikePost] = useState(false);

  const handleDelete = () => {
    deletePost(post.id)
      .then(() => refreshPostList())
      .catch((err) => console.log(err));
  };

  const handleComments = () => {
    setCommentsOpen(true);
  };

  const checkUserLike = () => {
    likes.forEach((like) => {
      if (like.user.id === currentUser.id) {
        setUserLikePost(true);
        return true;
      }
    });
  };

  useEffect(() => {
    if (comments.length > 0) setCommentsOpen(true);
    checkUserLike();
  }, []);

  const imageUrl = imagePath ? `${process.env.REACT_APP_IMAGES_URL}/${imagePath}` : null;
  const timeAgo = formatTimeAgo(createdAt);
  const numberOfLikes = `${likes.length} J'aime`;
  const numberOfComments = `${comments.length} ${
    comments.length > 1 ? 'commentaires' : 'commentaire'
  }`;

  return editMode ? (
    <PostForm
      editMode={true}
      setEditMode={setEditMode}
      content={content}
      imagePath={imagePath}
      postId={post.id}
      setUpdatedPost={setUpdatedPost}
    />
  ) : (
    <PostContainer>
      <article className={styles.SinglePost}>
        <div className={styles.top_row}>
          <Link to={`/profile/${user.id}`}>
            <img className={styles.user_pic} src={defaultProfilePic} alt='Photo de profil' />
          </Link>

          <div className={styles.name_time_container}>
            <Link className={styles.name_text} to={`/profile/${user.id}`}>
              {user.firstname} {user.lastname}
            </Link>
            <span className={styles.time_text}>{timeAgo}</span>
          </div>

          {post.user.id === currentUser.id && (
            <EditMenu
              handleEdit={() => setEditMode(true)}
              handleDelete={handleDelete}
              iconSize='30'
            />
          )}
        </div>

        <p className={styles.content_text}>{content}</p>

        {!!imageUrl && <img className={styles.image} src={imageUrl} alt='random' />}

        <div>
          <div className={styles.counts_row}>
            <span>{numberOfLikes}</span>
            <span>{numberOfComments}</span>
          </div>

          <div className={styles.interaction_row}>
            <button className={styles.interaction_button}>
              <IconLike active={userLikePost} size='22' />
              <span className={userLikePost ? styles.like_btn_active : ''}>J'aime</span>
            </button>
            <button className={styles.interaction_button} onClick={handleComments}>
              <IconComment size='22' />
              <span>Commenter</span>
            </button>
          </div>
        </div>

        {isCommentsOpen && (
          <Comments comments={comments} postId={post.id} setUpdatedPost={setUpdatedPost} />
        )}
      </article>
    </PostContainer>
  );
};

export default SinglePost;
