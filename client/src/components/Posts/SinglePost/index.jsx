import PostContainer from 'components/Posts/PostContainer';
import defaultProfilePic from 'assets/images/default-profile-pic.jpg';
import randomPic from 'assets/images/random-pic.jpg';
import styles from './SinglePost.module.css';
import Icon from 'components/Icon';

const SinglePost = ({ post }) => {
  // const { id, content, imagePath, createdAt, likeCount, user } = post;
  return (
    <PostContainer>
      <article className={styles.SinglePost}>
        <div className={styles.top_row}>
          <img
            className={styles.user_pic}
            src={defaultProfilePic}
            alt='Photo de profil'
          />
          <div className={styles.name_time_container}>
            <span className={styles.name_text}>jacouille la fripouille</span>
            <span className={styles.time_text}>Il y a 15h</span>
          </div>
          <Icon size='32' />
        </div>
        <p className={styles.content_text}>
          Magnifique la Valle Del Cocora en Colombie !
        </p>
        <img className={styles.image} src={randomPic} alt='random' />
      </article>
    </PostContainer>
  );
};

export default SinglePost;
