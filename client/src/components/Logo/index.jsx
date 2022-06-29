import styles from './Logo.module.css';
import logo from 'assets/images/logo-color.svg';

const Logo = () => {
  return <img src={logo} alt='Logo Groupomania' className={styles.Logo} />;
};
export default Logo;
