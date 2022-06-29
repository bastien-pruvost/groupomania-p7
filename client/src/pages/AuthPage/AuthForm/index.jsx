import styles from './AuthForm.module.css';
import { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { api } from 'utils/axios.utils';
import { handleError } from 'utils/errors.utils';
import { UserContext } from 'contexts/UserContext';
import FormGroup from 'components/FormGroup';

const AuthForm = ({ loginMode }) => {
  const { setCurrentUserId } = useContext(UserContext);
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
      setCurrentUserId(response.data.userId);
      navigate('/');
    } catch (err) {
      handleError(err);
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
      setCurrentUserId(response.data.userId);
      navigate('/');
    } catch (err) {
      handleError(err);
      setAuthErrorMessage(err.response.data.message);
    }
  };

  return (
    <form
      className={styles.AuthForm}
      onSubmit={loginMode ? handleLogin : handleRegister}
      id='auth-form'
    >
      <h2>{loginMode ? 'Connexion' : 'Inscription'}</h2>

      <FormGroup
        label='Email'
        id='email'
        type='text'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        errorMsg='Erreur email'
      />

      {!loginMode && (
        <FormGroup
          label='Nom'
          id='lastname'
          type='text'
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
          errorMsg='Erreur nom'
        />
      )}

      {!loginMode && (
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

      {!loginMode && (
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
        value={loginMode ? `Se Connecter` : `S'inscrire`}
        className={styles.submit_btn + ' btn btn-primary-red'}
      />

      {loginMode ? (
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
