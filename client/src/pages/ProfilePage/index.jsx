import styles from './ProfilePage.module.css';
import randomPic from 'assets/images/random-pic.jpg';
import defaultProfilePic from 'assets/images/default-profile-pic.jpg';

const ProfilePage = () => {
  return (
    <>
      <div className={styles.user_profile_container}>
        <img className={styles.cover_pic} src={randomPic} alt='Photo de couverture' />
        <div className={styles.description_grid}>
          <div className={styles.infos_column}>
            <img className={styles.profile_pic} src={defaultProfilePic} alt='' />
            <h2 className={styles.name}>Bastien Pruvost</h2>
            <span className={styles.profession}>Developpeur Web</span>

            <span className={styles.info_item}>City</span>
            <span className={styles.info_item}>Phone</span>
            <span className={styles.info_item}>LinkedIn</span>
            <span className={styles.info_item}>Birth Date</span>
          </div>

          <p className={styles.bio_column}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam corrupti dolorum qui
            rerum possimus. Culpa iste at totam quae praesentium fugit accusamus deserunt, dolor
            architecto delectus tempore odit asperiores in ab modi!
          </p>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
