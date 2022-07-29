import styles from './UserProfile.module.css';
import randomPic from 'assets/images/random-pic.jpg';
import defaultProfilePic from 'assets/images/default-profile-pic.jpg';
import IconMapPin from 'components/Icons/IconMapPin';
import IconPhone from 'components/Icons/IconPhone';
import IconLinkedin from 'components/Icons/IconLinkedin';
import IconCalendar from 'components/Icons/IconCalendar';
import IconEdit from 'components/Icons/IconEdit';

const UserProfile = ({ userProfile }) => {
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
    <div className={styles.UserProfile}>
      <img className={styles.coverPic} src={randomPic} alt='Photo de couverture' />
      <div className={styles.infosContainer}>
        <div className={styles.infosColumn}>
          <img className={styles.profilePic} src={defaultProfilePic} alt='' />
          <h2 className={styles.name}>{`${firstname} ${lastname}`}</h2>
          {profession && <span className={styles.profession}>{profession}</span>}
        </div>

        <div className={styles.infosColumn}>
          {city && (
            <div className={styles.infoItem}>
              <IconMapPin size={20} /> <span>{city}</span>
            </div>
          )}
          {birthDate && (
            <div className={styles.infoItem}>
              <IconCalendar size={20} />
              <span>{birthDate}</span>
            </div>
          )}
          {phoneNumber && (
            <div className={styles.infoItem}>
              <IconPhone size={20} />
              <span>{phoneNumber}</span>
            </div>
          )}
          {linkedinUrl && (
            <div className={styles.infoItem}>
              <IconLinkedin size={20} />
              <a href={linkedinUrl} target='_blank'>
                LinkedIn
              </a>
            </div>
          )}
        </div>

        {bio && <p className={styles.bioColumn}>{bio}</p>}
        <IconEdit size='20' />
      </div>
    </div>
  );
};

export default UserProfile;
