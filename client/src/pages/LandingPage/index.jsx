import styles from './LandingPage.module.css';
import { Link } from 'react-router-dom';
import Wrapper from 'components/Wrapper';
import landingIllustration from 'assets/images/landing-illustration.svg';

function LandingPage() {
  return (
    <Wrapper>
      <main className={styles.hero}>
        <div className={styles.heroText}>
          <h1>
            Restez en <span>contact</span> avec vos collègues
          </h1>
          <p>
            Entretenez des liens avec vos collaborateurs grâce à votre nouveau réseau social
            d'entreprise.
          </p>
          <Link to='/signup' className={styles.heroBtn + ' btn btn-primary-red'}>
            S'inscrire
          </Link>
          <Link to='/signin' className={styles.heroBtn + ' btn btn-secondary-red'}>
            Se connecter
          </Link>
        </div>
        <img
          className={styles.heroImg}
          src={landingIllustration}
          alt='Groupe de personnes qui tiennent des posts de reseaux sociaux dans leurs mains'
        />
      </main>
    </Wrapper>
  );
}

export default LandingPage;
