import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from 'contexts/UserContext';
import styles from './Header.module.css';
import Wrapper from 'components/Wrapper';
import Logo from 'components/Logo';
import UserMenu from 'components/Header/UserMenu';

const Header = () => {
  const { currentUser } = useContext(UserContext);

  return (
    <header className={styles.Header}>
      <Wrapper>
        <div className={styles.flex_container}>
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
