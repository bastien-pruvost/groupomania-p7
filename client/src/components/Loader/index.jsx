import styles from './Loader.module.css';

const Loader = ({ grey }) => {
  return (
    <div className={styles.Loader}>
      <span className={`${styles.spinner} ${grey && styles.grey}`}></span>
    </div>
  );
};

export default Loader;
