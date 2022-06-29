import { useState } from 'react';
import api from 'services/apiRequest';
import { Link } from 'react-router-dom';
import styles from './AuthForm.module.css';
import FormGroup from 'components/FormGroup';

const AuthForm = ({ isLoginMode }) => {
  const [email, setEmail] = useState('');
  const [lastname, setLastname] = useState('');
  const [firstname, setFirstname] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [authErrorMessage, setAuthErrorMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/users/login', { email, password });
      console.log(response.data.message);
    } catch (err) {
      console.log(err.response.data.message);
      setAuthErrorMessage(err.response.data.message);
    }
  };

  return (
    <form className={styles.AuthForm} onSubmit={handleLogin} id='auth-form'>
      <h2>{isLoginMode ? 'Connexion' : 'Inscription'}</h2>

      <FormGroup
        label='Email'
        id='email'
        type='text'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        errorMsg='Error test'
      />

      {/* <div className='form-group'>
        <label htmlFor='email' className='form-label'>
          Email
        </label>
        <input
          className='form-input'
          type='text'
          name='email'
          id='email'
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <span className='form-alert'>Test erreur</span>
      </div> */}

      {!isLoginMode && (
        <div className='form-group'>
          <label htmlFor='lastname' className='form-label'>
            Nom
          </label>
          <input
            className='form-input'
            type='text'
            name='lastname'
            id='lastname'
            onChange={(e) => setLastname(e.target.value)}
            value={lastname}
          />
          <span className='form-alert'>Test erreur</span>
        </div>
      )}

      {!isLoginMode && (
        <div className='form-group'>
          <label htmlFor='firstname' className='form-label'>
            Prénom
          </label>
          <input
            className='form-input'
            type='text'
            name='firstname'
            id='firstname'
            onChange={(e) => setFirstname(e.target.value)}
            value={firstname}
          />
          <span className='form-alert'>Test erreur</span>
        </div>
      )}

      <div className='form-group'>
        <label htmlFor='password' className='form-label'>
          Mot de passe
        </label>
        <input
          className='form-input'
          type='password'
          name='password'
          id='password'
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <span className='form-alert'>Test erreur</span>
      </div>

      {!isLoginMode && (
        <div className='form-group'>
          <label htmlFor='passwordConfirm' className='form-label'>
            Confirmation du mot de passe
          </label>
          <input
            className='form-input'
            type='password'
            name='passwordConfirm'
            id='passwordConfirm'
            onChange={(e) => setPasswordConfirm(e.target.value)}
            value={passwordConfirm}
          />
          <span className='form-alert'>Test erreur</span>
        </div>
      )}

      <span className='alert alert-danger'>{authErrorMessage}</span>

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
