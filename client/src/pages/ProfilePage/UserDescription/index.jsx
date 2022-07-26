import styles from './UserDescription.module.css';
import randomPic from 'assets/images/random-pic.jpg';
import defaultProfilePic from 'assets/images/default-profile-pic.jpg';
import IconMapPin from 'components/Icons/IconMapPin';
import IconPhone from 'components/Icons/IconPhone';
import IconLinkedin from 'components/Icons/IconLinkedin';
import IconCalendar from 'components/Icons/IconCalendar';

const UserDescription = ({ userProfile }) => {
  const {
    firstname,
    lastname,
    // profilePicPath,
    // coverPicPath,
    profession,
    birthDate,
    city,
    phoneNumber,
    linkedinUrl,
    bio
  } = userProfile;

  return (
    <div className={styles.UserDescription}>
      <img className={styles.cover_pic} src={randomPic} alt='Photo de couverture' />
      <div className={styles.description_flex}>
        <div className={styles.infos_column}>
          <img className={styles.profile_pic} src={defaultProfilePic} alt='' />
          <h2 className={styles.name}>{`${firstname} ${lastname}`}</h2>
          {profession && <span className={styles.profession}>{profession}</span>}
        </div>

        <div className={styles.info_container}>
          {city && (
            <div className={styles.info_item}>
              <IconMapPin size={20} /> <span>{city}</span>
            </div>
          )}
          {birthDate && (
            <div className={styles.info_item}>
              <IconCalendar size={20} />
              <span>{birthDate}</span>
            </div>
          )}
          {phoneNumber && (
            <div className={styles.info_item}>
              <IconPhone size={20} />
              <span>{phoneNumber}</span>
            </div>
          )}
          {linkedinUrl && (
            <div className={styles.info_item}>
              <IconLinkedin size={20} />
              <a href={linkedinUrl} target='_blank'>
                LinkedIn
              </a>
            </div>
          )}
        </div>

        {bio && <p className={styles.bio_column}>{bio}</p>}
      </div>
    </div>
  );
};

export default UserDescription;
