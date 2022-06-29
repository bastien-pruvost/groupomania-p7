import { useState } from 'react';
import { api } from 'utils/api.utils';
import { Link, useNavigate } from 'react-router-dom';
import styles from './AuthForm.module.css';
import FormGroup from 'components/FormGroup';

const AuthForm = ({ isLoginMode }) => {
  const [email, setEmail] = useState('');
  const [lastname, setLastname] = useState('');
  const [firstname, setFirstname] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [authErrorMessage, setAuthErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/users/login', { email, password });
      console.log(response.data.message);
      navigate('/');
    } catch (err) {
      console.log(err.response.data.message);
      setAuthErrorMessage(err.response.data.message);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/users/register', {
        email,
        lastname,
        firstname,
        password,
        passwordConfirm
      });
      console.log(response.data.message);
      navigate('/');
    } catch (err) {
      console.log(err.response.data.message);
      setAuthErrorMessage(err.response.data.message);
    }
  };

  return (
    <form
      className={styles.AuthForm}
      onSubmit={isLoginMode ? handleLogin : handleRegister}
      id='auth-form'
    >
      <h2>{isLoginMode ? 'Connexion' : 'Inscription'}</h2>

      <FormGroup
        label='Email'
        id='email'
        type='text'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        errorMsg='Erreur email'
      />

      {!isLoginMode && (
        <FormGroup
          label='Nom'
          id='lastname'
          type='text'
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
          errorMsg='Erreur nom'
        />
      )}

      {!isLoginMode && (
        <FormGroup
          label='Prénom'
          id='firstname'
          type='text'
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
          errorMsg='Erreur prénom'
        />
      )}

      <FormGroup
        label='Mot de passe'
        id='password'
        type='password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        errorMsg='Erreur mot de passe'
      />

      {!isLoginMode && (
        <FormGroup
          label='Confirmation mot de passe'
          id='passwordConfirm'
          type='password'
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
          errorMsg='Erreur confirmation mdp'
        />
      )}

      {!!authErrorMessage && (
        <span className='alert alert-danger'>{authErrorMessage}</span>
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
