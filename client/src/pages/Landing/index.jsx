import styles from './style.module.css';
import Logo from 'components/Logo';
import landingIllustration from 'assets/images/landing-illustration.svg';

function Landing() {
  return (
    <div className={styles.Landing + ' wrapper-large'}>
      <header className={styles.Landing__header}>
        <Logo />
      </header>
      <main className={styles.Landing__container}>
        <div className={styles.Landing__text}>
          <h1>
            Restez en <span>contact</span> avec vos collègues
          </h1>
          <p>
            Entretenez des liens avec vos collaborateurs grace à votre nouveau
            réseau social d'entreprise.
          </p>
        </div>
        <img src={landingIllustration} alt='' />
      </main>
    </div>
  );
}

export default Landing;
