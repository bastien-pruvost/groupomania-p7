import styles from './style.module.css';
import logo from '../../assets/images/logo-color.svg';
import landingIllustration from '../../assets/images/landing-illustration.svg';
function Landing() {
  return (
    <main className={styles.Landing + ' wrapper-large'}>
      <header className={styles.Landing__header}>
        <img
          src={logo}
          alt='Logo Groupomania'
          className={styles.Landing__header__logo}
        />
      </header>
      <div className={styles.Landing__container}>
        <h1>Réseau Social d'Entreprise</h1>
        <img src={landingIllustration} alt='' />
      </div>
    </main>
  );
}

export default Landing;
