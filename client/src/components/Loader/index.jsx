import styles from './style.module.css';
import spinnerSvg from 'assets/images/spinner.svg';

const Loader = () => {
  return (
    <div className={styles.Loader}>
      <img src='spinnerSvg' alt='Chargement' />
    </div>
  );
};

export default Loader;
