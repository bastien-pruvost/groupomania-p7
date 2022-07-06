import PostContainer from 'components/Posts/PostContainer';
import defaultProfilePic from 'assets/images/default-profile-pic.jpg';
import randomPic from 'assets/images/random-pic.jpg';
import styles from './SinglePost.module.css';
import IconMore from 'components/Icons/IconMore';
import IconLike from 'components/Icons/IconLike';
import IconComment from 'components/Icons/IconComment';
import Comments from 'components/Posts/Comments';

const SinglePost = () => {
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
          <IconMore size='30' />
        </div>

        <p className={styles.content_text}>
          Magnifique la Valle Del Cocora en Colombie !
        </p>

        <img className={styles.image} src={randomPic} alt='random' />

        <div>
          <div className={styles.counts_row}>
            <span>150 J'aime</span>
            <span>3 commentaires</span>
          </div>
          <div className={styles.interaction_row}>
            <div className={styles.interaction_group}>
              <IconLike active={false} size='22' />
              <span>J'aime</span>
            </div>
            <div className={styles.interaction_group}>
              <IconComment size='22' />
              <span>Commenter</span>
            </div>
          </div>
        </div>

        <Comments />
      </article>
    </PostContainer>
  );
};

export default SinglePost;
