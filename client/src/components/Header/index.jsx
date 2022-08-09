import styles from './Header.module.css';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from 'contexts/AuthContext';
import Wrapper from 'components/Wrapper';
import UserMenu from 'components/Header/UserMenu';
import logo from 'assets/images/logo-color.svg';

const Header = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <header className={styles.Header}>
      <Wrapper>
        <div className={styles.flexContainer}>
          <Link to='/'>
            <img src={logo} alt='Logo Groupomania' className={styles.logo} />
          </Link>

          <nav className={styles.headerNav}>
            <Link to='/'>Accueil</Link>
            <Link to={`/profile/${currentUser.id}`}>Mon profil</Link>
          </nav>

          {!!currentUser.id && <UserMenu />}
        </div>
      </Wrapper>
    </header>
  );
};

export default Header;
