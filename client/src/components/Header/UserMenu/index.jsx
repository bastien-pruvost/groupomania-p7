import styles from './UserMenu.module.css';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from 'contexts/AuthContext';
import defaultProfilePic from 'assets/images/default-profile-pic.jpg';

const UserMenu = () => {
  const { currentUser, signout } = useContext(AuthContext);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const profilePicUrl = currentUser.profilePicPath
    ? `${process.env.REACT_APP_IMAGES_URL}/${currentUser.profilePicPath}`
    : defaultProfilePic;

  const handleMenu = () => {
    if (!isMenuOpen) {
      document.addEventListener('mousedown', closeMenuOnOutsideClick);
    } else {
      document.removeEventListener('mousedown', closeMenuOnOutsideClick);
    }
    setMenuOpen(!isMenuOpen);
  };

  const closeMenuOnOutsideClick = (e) => {
    if (!e.target.closest(`#UserMenu`)) {
      setMenuOpen(false);
      document.removeEventListener('mousedown', closeMenuOnOutsideClick);
    }
  };

  const handleProfileBtn = () => {
    navigate(`/profile/${currentUser.id}`);
    setMenuOpen(false);
  };

  const handleSignoutBtn = () => {
    signout();
    setMenuOpen(false);
  };

  return (
    <div className={styles.UserMenu} id='UserMenu'>
      <div tabIndex='0' className={styles.toggleMenu} onClick={handleMenu} onKeyDown={handleMenu}>
        <span className={styles.names}>{`${currentUser.firstname} ${currentUser.lastname}`}</span>
        <img className={styles.profilePic} src={profilePicUrl} alt='Photo de profil' />
      </div>

      {!!isMenuOpen && (
        <div className={styles.menu}>
          <button onClick={handleProfileBtn}>Mon profil</button>
          <button onClick={handleSignoutBtn}>Déconnexion</button>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
