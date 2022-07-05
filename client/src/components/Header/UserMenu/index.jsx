import styles from './UserMenu.module.css';
import { useContext, useState } from 'react';
import { UserContext } from 'contexts/UserContext';
import { signoutRequest } from 'services/auth.services';
import { Link, useNavigate } from 'react-router-dom';
import defaultProfilePic from 'assets/images/default-profile-pic.jpg';

const UserMenu = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

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
    signoutRequest()
      .then(() => {
        setCurrentUser({
          id: null,
          isAdmin: false,
          firstname: '',
          lastname: '',
          profilePicPath: 'default-profile-pic.jpg'
        });
        navigate('/landing');
      })
      .catch((err) => console.log(err));
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
