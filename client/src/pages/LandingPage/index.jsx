import { Link } from 'react-router-dom';
import styles from './LandingPage.module.css';
import landingIllustration from 'assets/images/landing-illustration.svg';
import Wrapper from 'components/Wrapper';

function LandingPage() {
  return (
    <div className={styles.LandingPage}>
      <Wrapper>
        <main className={styles.hero}>
          <div className={styles.hero__text}>
            <h1>
              Restez en <span>contact</span> avec vos collègues
            </h1>
            <p>
              Entretenez des liens avec vos collaborateurs grâce à votre nouveau
              réseau social d'entreprise.
            </p>
            <Link
              to='/signup'
              className={styles.hero__btn + ' btn btn-primary-red'}
            >
              S'inscrire
            </Link>
            <Link
              to='/signin'
              className={styles.hero__btn + ' btn btn-secondary-red'}
            >
              Se connecter
            </Link>
          </div>
          <img
            className={styles.hero__img}
            src={landingIllustration}
            alt='Groupe de personnes qui tiennent des posts de reseaux sociaux dans leurs mains'
          />
        </main>
      </Wrapper>
    </div>
  );
}

export default LandingPage;
