import { Outlet } from 'react-router-dom';
import styles from './HomePage.module.css';

const HomePage = () => {
  return (
    <div className={styles.HomePage}>
      <Outlet />
    </div>
  );
};

export default HomePage;
