import { Link } from 'react-router-dom';
import styles from './style.module.css';
import landingIllustration from 'assets/images/landing-illustration.svg';
import Header from 'components/Header';
import Wrapper from 'components/Wrapper';

function LandingPage() {
  return (
    <div className={styles.Landing}>
      <Header />
      <Wrapper>
        <main className={styles.Landing__container}>
          <div className={styles.Landing__text}>
            <h1>
              Restez en <span>contact</span> avec vos collègues
            </h1>
            <p>
              Entretenez des liens avec vos collaborateurs grace à votre nouveau
              réseau social d'entreprise.
            </p>
            <Link
              to='/login'
              className={styles.Landing__btn + ' btn btn-secondary-red'}
            >
              Se connecter
            </Link>
            <Link
              to='/register'
              className={styles.Landing__btn + ' btn btn-primary-red'}
            >
              S'inscrire
            </Link>
          </div>
          <img
            src={landingIllustration}
            alt='Groupe de personnes qui tiennent des posts de reseaux sociaux dans leurs mains'
          />
        </main>
      </Wrapper>
    </div>
  );
}

export default LandingPage;
