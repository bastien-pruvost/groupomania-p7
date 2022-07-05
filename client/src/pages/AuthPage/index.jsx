import styles from './AuthPage.module.css';
import Wrapper from 'components/Wrapper';
import AuthForm from 'pages/AuthPage/AuthForm';

const AuthPage = ({ signinMode }) => {
  return (
    <Wrapper>
      <div className={styles.container}>
        <AuthForm signinMode={signinMode} />
      </div>
    </Wrapper>
  );
};
export default AuthPage;
