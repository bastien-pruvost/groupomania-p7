import styles from './AuthPage.module.css';
import Header from 'components/Header';
import Wrapper from 'components/Wrapper';
import AuthForm from 'pages/AuthPage/AuthForm';

const AuthPage = ({ isLoginMode }) => {
  return (
    <div className={styles.AuthPage}>
      <Header />
      <Wrapper>
        <div className={styles.container}>
          <AuthForm isLoginMode={isLoginMode} />
        </div>
      </Wrapper>
    </div>
  );
};
export default AuthPage;
