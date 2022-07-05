import { Outlet } from 'react-router-dom';
import styles from './MainLayout.module.css';
import Wrapper from 'components/Wrapper';

const MainLayout = () => {
  return (
    <Wrapper>
      <div className={styles.MainLayout}>
        <Outlet />
      </div>
    </Wrapper>
  );
};

export default MainLayout;
