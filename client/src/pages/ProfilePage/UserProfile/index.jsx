import styles from './UserProfile.module.css';
import { useContext } from 'react';
import useTextLimiter from 'hooks/useTextLimiter';
import { formatBirthDateText } from 'utils/dates.utils';
import { AuthContext } from 'contexts/AuthContext';
import IconMapPin from 'components/Icons/IconMapPin';
import IconPhone from 'components/Icons/IconPhone';
import IconGift from 'components/Icons/IconGift';
import IconLinkedin from 'components/Icons/IconLinkedin';
import IconEdit from 'components/Icons/IconEdit';
import defaultCoverPic from 'assets/images/default-cover-pic.jpg';
import defaultProfilePic from 'assets/images/default-profile-pic.jpg';

const UserProfile = ({ userData, setEditMode }) => {
  const { currentUser } = useContext(AuthContext);
  const {
    firstname,
    lastname,
    profilePicPath,
    coverPicPath,
    profession,
    birthDate,
    city,
    phoneNumber,
    linkedinUrl,
    bio
  } = userData;
  const { isContentLimited, textContent, handleLimitedText } = useTextLimiter({
    text: bio,
    paragraphsLimit: 3,
    charactersLimit: 400
  });

  const allowEdit = currentUser.id === userData.id || currentUser.isAdmin;

  const birthDateText = birthDate ? formatBirthDateText(birthDate) : null;

  const coverPicUrl = coverPicPath
    ? `${process.env.REACT_APP_IMAGES_URL}/${coverPicPath}`
    : defaultCoverPic;

  const profilePicUrl = profilePicPath
    ? `${process.env.REACT_APP_IMAGES_URL}/${profilePicPath}`
    : defaultProfilePic;

  return (
    <div className={styles.UserProfile}>
      <img
        className={styles.coverPic}
        src={coverPicUrl}
        alt={`Photo de couverture de ${firstname} ${lastname}`}
      />
      <div className={styles.infosContainer}>
        <div className={styles.infosColumn}>
          <img
            className={styles.profilePic}
            src={profilePicUrl}
            alt={`Photo de profil de ${firstname} ${lastname}`}
          />
          {firstname && <h2 className={styles.name}>{`${firstname} ${lastname}`}</h2>}
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
              <IconGift size={20} />
              <span>{birthDateText}</span>
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

        {bio && (
          <p className={styles.bioColumn}>
            {textContent}
            {isContentLimited && (
              <button className='limit-text-btn' onClick={handleLimitedText}>
                Voir plus
              </button>
            )}
          </p>
        )}

        {allowEdit && (
          <button className={styles.editBtn} onClick={() => setEditMode(true)}>
            <IconEdit size='20' />
          </button>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
