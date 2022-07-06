import { Outlet } from 'react-router-dom';
import styles from './MainLayout.module.css';
import Wrapper from 'components/Wrapper';

const MainLayout = () => {
  return (
    <div className={styles.MainLayout}>
      <Wrapper>
        <Outlet />
      </Wrapper>
    </div>
  );
};

export default MainLayout;
