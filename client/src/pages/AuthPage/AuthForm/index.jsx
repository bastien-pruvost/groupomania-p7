import styles from './AuthForm.module.css';
import { useState, useRef, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { authValidator } from 'utils/validationSchemas.utils';
import { AuthContext } from 'contexts/AuthContext';
import Loader from 'components/Loader';

const AuthForm = ({ signinMode }) => {
  const { signin, signup } = useContext(AuthContext);
  const [isLoading, setLoading] = useState(false);
  const [responseErrorMsg, setResponseErrorMsg] = useState([]);
  const { formState, watch, handleSubmit, register } = useForm({
    mode: 'onSubmit'
  });
  const { errors } = formState;
  const password = useRef({});
  password.current = watch('password');
  const validationSchema = signinMode ? true : authValidator(password.current);

  const onSubmit = async (formData) => {
    setResponseErrorMsg([]);
    setLoading(true);
    const authMethod = signinMode ? signin : signup;
    authMethod(formData)
      .catch((err) => setResponseErrorMsg(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    setResponseErrorMsg([]);
  }, [signinMode]);

  return (
    <form className={styles.AuthForm} onSubmit={handleSubmit(onSubmit)}>
      <h2>{signinMode ? 'Connexion' : 'Inscription'}</h2>

      <div className='form-group'>
        <label htmlFor='email' className='form-label'>
          Email
        </label>
        <input
          className={`form-input ${errors.email ? 'error' : ''}`}
          id='email'
          type='text'
          {...register('email', { validate: validationSchema.email })}
        />
        <span className='form-alert'>{errors.email?.message}</span>
      </div>

      <div className='form-group'>
        <label htmlFor='password' className='form-label'>
          Mot de passe
        </label>
        <input
          className={`form-input ${errors.password ? 'error' : ''}`}
          id='password'
          type='password'
          {...register('password', { validate: validationSchema.password })}
        />
        <span className='form-alert'>{errors.password?.message}</span>
      </div>

      {!signinMode && (
        <div className='form-group'>
          <label htmlFor='passwordConfirm' className='form-label'>
            Confirmation mot de passe
          </label>
          <input
            className={`form-input ${errors.passwordConfirm ? 'error' : ''}`}
            id='passwordConfirm'
            type='password'
            {...register('passwordConfirm', {
              validate: validationSchema.passwordConfirm
            })}
          />
          <span className='form-alert'>{errors.passwordConfirm?.message}</span>
        </div>
      )}

      {!signinMode && (
        <div className='form-group'>
          <label htmlFor='lastname' className='form-label'>
            Nom
          </label>
          <input
            className={`form-input ${errors.lastname ? 'error' : ''}`}
            id='lastname'
            type='text'
            {...register('lastname', { validate: validationSchema.lastname })}
          />
          <span className='form-alert'>{errors.lastname?.message}</span>
        </div>
      )}

      {!signinMode && (
        <div className='form-group'>
          <label htmlFor='firstname' className='form-label'>
            Prénom
          </label>
          <input
            className={`form-input ${errors.firstname ? 'error' : ''}`}
            id='firstname'
            type='text'
            {...register('firstname', {
              validate: validationSchema.firstname
            })}
          />
          <span className='form-alert'>{errors.firstname?.message}</span>
        </div>
      )}

      {responseErrorMsg.length > 0 && (
        <ul className='alert alert-danger'>
          {responseErrorMsg.map((message, index) => (
            <li className='alert-li' key={index}>
              {message}
            </li>
          ))}
        </ul>
      )}

      {isLoading ? (
        <Loader />
      ) : (
        <input
          type='submit'
          value={signinMode ? `Se Connecter` : `S'inscrire`}
          className={`${styles.submitBtn} btn btn-primary-red`}
        />
      )}

      {signinMode ? (
        <p className={styles.switchAuthText}>
          Pas encore de compte ?&ensp;
          <Link to='/signup' className='btn-ghost'>
            S'inscrire
          </Link>
        </p>
      ) : (
        <p className={styles.switchAuthText}>
          Déjà inscrit ?&ensp;
          <Link to='/signin' className='btn-ghost'>
            Se connecter
          </Link>
        </p>
      )}
    </form>
  );
};

export default AuthForm;
