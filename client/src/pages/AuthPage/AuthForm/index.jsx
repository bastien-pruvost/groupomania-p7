import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styles from './AuthForm.module.css';

const AuthForm = ({ isLoginMode }) => {
  const [email, setEmail] = useState('');
  const [lastname, setLastname] = useState('');
  const [firstname, setFirstname] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    axios.post();
  };

  return (
    <form className={styles.AuthForm} onSubmit={handleLogin} id='auth-form'>
      <h2>{isLoginMode ? 'Connexion' : 'Inscription'}</h2>
      <p>{process.env.REACT_APP_API_URL}</p>
      <div className={styles.group}>
        <label htmlFor='email'>Email</label>
        <input
          className='form-input'
          type='text'
          name='email'
          id='email'
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </div>

      {!isLoginMode && (
        <div className={styles.group}>
          <label htmlFor='lastname'>Nom</label>
          <input
            className='form-input'
            type='text'
            name='lastname'
            id='lastname'
            onChange={(e) => setLastname(e.target.value)}
            value={lastname}
          />
        </div>
      )}

      {!isLoginMode && (
        <div className={styles.group}>
          <label htmlFor='firstname'>Prénom</label>
          <input
            className='form-input'
            type='text'
            name='firstname'
            id='firstname'
            onChange={(e) => setFirstname(e.target.value)}
            value={firstname}
          />
        </div>
      )}

      <div className={styles.group}>
        <label htmlFor='password'>Mot de passe</label>
        <input
          className='form-input'
          type='password'
          name='password'
          id='password'
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </div>

      {!isLoginMode && (
        <div className={styles.group}>
          <label htmlFor='passwordConfirm'>Confirmation du mot de passe</label>
          <input
            className='form-input'
            type='password'
            name='passwordConfirm'
            id='passwordConfirm'
            onChange={(e) => setPasswordConfirm(e.target.value)}
            value={passwordConfirm}
          />
        </div>
      )}

      <input
        type='submit'
        value={isLoginMode ? `Se Connecter` : `S'inscrire`}
        className={styles.submit_btn + ' btn btn-primary-red'}
      />

      {isLoginMode ? (
        <p className={styles.switch_auth_text}>
          Pas encore de compte ?&ensp;
          <Link to='/register' className='btn-ghost'>
            S'inscrire
          </Link>
        </p>
      ) : (
        <p className={styles.switch_auth_text}>
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
