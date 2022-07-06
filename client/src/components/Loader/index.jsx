import styles from './style.module.css';

const Loader = () => {
  return (
    <div className={styles.Loader}>
      <span className={styles.spinner}></span>
    </div>
  );
};

export default Loader;
