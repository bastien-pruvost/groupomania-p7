import styles from './Header.module.css';
import { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from 'contexts/AuthContext';
import Wrapper from 'components/Wrapper';
import UserMenu from 'components/Header/UserMenu';
import logo from 'assets/images/logo-color.svg';
import IconHome from 'components/Icons/IconHome';

const Header = () => {
  const { currentUser } = useContext(AuthContext);
  const location = useLocation();

  return (
    <header className={styles.Header}>
      <Wrapper>
        <div className={styles.flexContainer}>
          <Link to='/'>
            <img src={logo} alt='Logo Groupomania' className={styles.logo} />
          </Link>

          {!!currentUser.id && (
            <>
              {location.pathname !== '/feed' && (
                <nav className={styles.headerNav}>
                  <Link to='/' aria-label="Page d'accueil">
                    <IconHome size='24' />
                  </Link>
                </nav>
              )}

              <UserMenu />
            </>
          )}
        </div>
      </Wrapper>
    </header>
  );
};

export default Header;
