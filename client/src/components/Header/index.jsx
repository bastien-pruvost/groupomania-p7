import styles from './style.module.css';
import Logo from 'components/Logo';

const Header = ({ children }) => {
  return (
    <header className={styles.Header}>
      <Logo />
      {children}
    </header>
  );
};
export default Header;
