import styles from './Loader.module.css';
// import { useEffect, useState } from 'react';

const Loader = ({ grey }) => {
  // const [isShown, setShown] = useState(false);

  // useEffect(() => {
  //   setTimeout(() => {
  //     setShown(true);
  //   }, 500);
  // }, []);

  return (
    <div className={styles.Loader}>
      <span className={`${styles.spinner} ${grey && styles.grey}`}></span>
    </div>
  );
};

export default Loader;
