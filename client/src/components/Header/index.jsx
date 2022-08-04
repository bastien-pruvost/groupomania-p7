import styles from './Header.module.css';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from 'contexts/AuthContext';
import Wrapper from 'components/Wrapper';
import Logo from 'components/Logo';
import UserMenu from 'components/Header/UserMenu';

const Header = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <header className={styles.Header}>
      <Wrapper>
        <div className={styles.flexContainer}>
          <Link to='/'>
            <Logo />
          </Link>

          {!!currentUser.id && <UserMenu />}
        </div>
      </Wrapper>
    </header>
  );
};

export default Header;
