import styles from './UserMenu.module.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from 'hooks/useAuth';
import defaultProfilePic from 'assets/images/default-profile-pic.jpg';

const UserMenu = () => {
  const { currentUser, signout } = useAuth();
  const [isMenuOpen, setMenuOpen] = useState(false);
  // const cloudinaryUrl = process.env.REACT_APP_CLOUDINARY_URL;

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

  const handleSignout = () => {
    signout();
  };

  return (
    <div className={styles.UserMenu} id='UserMenu'>
      <div
        tabIndex='0'
        className={styles.toggle_menu}
        onClick={handleMenu}
        onKeyDown={handleMenu}
      >
        <span
          className={styles.names}
        >{`${currentUser.firstname} ${currentUser.lastname}`}</span>
        <img
          className={styles.profile_pic}
          // src={`${cloudinaryUrl}/${currentUser.profilePicPath}`}
          src={defaultProfilePic}
          alt='Photo de profil'
        />
      </div>

      {!!isMenuOpen && (
        <div className={styles.menu}>
          <Link to={`/profile/${currentUser.id}`}>Mon profil</Link>
          <Link to='#' onClick={handleSignout}>
            Déconnexion
          </Link>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
