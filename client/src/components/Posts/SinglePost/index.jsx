import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { formatTimeAgo } from 'utils/dates.utils';
import styles from './SinglePost.module.css';
import PostContainer from 'components/Posts/PostContainer';
import Comments from 'components/Posts/Comments';
import defaultProfilePic from 'assets/images/default-profile-pic.jpg';
import randomPic from 'assets/images/random-pic.jpg';
import IconMore from 'components/Icons/IconMore';
import IconLike from 'components/Icons/IconLike';
import IconComment from 'components/Icons/IconComment';
import PostForm from 'components/Posts/PostForm';
import { UserContext } from 'contexts/UserContext';

const SinglePost = ({ post, deletePost, refreshPostList }) => {
  const { currentUser } = useContext(UserContext);
  const [updatedPost, setUpdatedPost] = useState(null);
  const { user, createdAt, user_like_posts: likes, comments } = post;
  const { imagePath, content } = updatedPost || post;
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  // const cloudinaryUrl = process.env.REACT_APP_CLOUDINARY_URL;

  const handleMenu = () => {
    if (!isMenuOpen) {
      document.addEventListener('mousedown', closeMenuOnOutsideClick);
    } else {
      document.removeEventListener('mousedown', closeMenuOnOutsideClick);
    }
    setMenuOpen(!isMenuOpen);
  };

  const handleDelete = () => {
    console.log(post.user.id);
    console.log(currentUser.id);
    deletePost(post.id)
      .then(() => refreshPostList())
      .catch((err) => console.log(err));
  };

  const closeMenuOnOutsideClick = (e) => {
    if (!e.target.closest(`.more_menu_container`)) {
      setMenuOpen(false);
      document.removeEventListener('mousedown', closeMenuOnOutsideClick);
    }
  };

  const timeAgo = formatTimeAgo(createdAt);

  const imageUrl = imagePath ? `${process.env.REACT_APP_CLOUDINARY_URL}/${imagePath}` : null;

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
            <span className={styles.name_text}>
              <Link to={`/profile/${user.id}`}>
                {user.firstname} {user.lastname}
              </Link>
            </span>
            <span className={styles.time_text}>{timeAgo}</span>
          </div>
          {post.user.id === currentUser.id && (
            <div className={styles.more_menu_container + ' more_menu_container'}>
              <button className={styles.more_button} onClick={handleMenu} onKeyDown={handleMenu}>
                <IconMore size='30' />
              </button>

              {!!isMenuOpen && (
                <div className={styles.more_menu}>
                  <button onClick={() => setEditMode(true)}>Modifier le post</button>
                  <button onClick={handleDelete}>Supprimer le post</button>
                </div>
              )}
            </div>
          )}
        </div>

        <p className={styles.content_text}>{content}</p>

        {!!imageUrl && <img className={styles.image} src={randomPic} alt='random' />}

        <div>
          <div className={styles.counts_row}>
            <span>{numberOfLikes}</span>
            <span>{numberOfComments}</span>
          </div>
          <div className={styles.interaction_row}>
            <button className={styles.interaction_button}>
              <IconLike active={false} size='22' />
              <span>J'aime</span>
            </button>
            <button className={styles.interaction_button}>
              <IconComment size='22' />
              <span>Commenter</span>
            </button>
          </div>
        </div>

        <Comments comments={comments} />
      </article>
    </PostContainer>
  );
};

export default SinglePost;
