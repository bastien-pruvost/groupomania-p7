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

const SinglePost = ({ post }) => {
  const { user, createdAt, content, imagePath, user_like_posts: likes, comments } = post;

  const timeAgo = formatTimeAgo(createdAt);

  const imageUrl = imagePath ? `${process.env.REACT_APP_CLOUDINARY_URL}/${imagePath}` : null;

  const numberOfLikes = `${likes.length} J'aime`;

  const numberOfComments = `${comments.length} ${
    comments.length > 1 ? 'commentaires' : 'commentaire'
  }`;

  return (
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
          <button className={styles.more_button}>
            <IconMore size='30' />
          </button>
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
