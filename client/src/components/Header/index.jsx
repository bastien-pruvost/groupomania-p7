import styles from './Header.module.css';
import Logo from 'components/Logo';
import Wrapper from 'components/Wrapper';
import { Link } from 'react-router-dom';

const Header = ({ children }) => {
  return (
    <header className={styles.Header}>
      <Wrapper>
        <Link to='/'>
          <Logo />
        </Link>

        {children}
      </Wrapper>
    </header>
  );
};
export default Header;
