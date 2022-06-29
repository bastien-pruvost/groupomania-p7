import { Link } from 'react-router-dom';
import styles from './style.module.css';

const AuthForm = ({ isLoginMode }) => {
  return (
    <form className={styles.AuthForm}>
      <h2>{isLoginMode ? 'Connexion' : 'Inscription'}</h2>
      {isLoginMode ? (
        <p>
          Pas encore de compte ?&ensp;
          <Link to='/register' className='btn-ghost'>
            S'inscrire
          </Link>
        </p>
      ) : (
        <p>
          Déjà inscrit ?&ensp;
          <Link to='/login' className='btn-ghost'>
            Se connecter
          </Link>
        </p>
      )}
    </form>
  );
};

export default AuthForm;
