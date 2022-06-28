import styles from './style.module.css';
import logo from 'assets/images/logo-color.svg';

const index = () => {
  return <img src={logo} alt='Logo Groupomania' className={styles.Logo} />;
};
export default index;
