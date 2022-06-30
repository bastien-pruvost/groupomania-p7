import styles from './AuthPage.module.css';
import Header from 'components/Header';
import Wrapper from 'components/Wrapper';
import AuthForm from 'pages/AuthPage/AuthForm';

const AuthPage = ({ signinMode }) => {
  return (
    <div className={styles.AuthPage}>
      <Header />
      <Wrapper>
        <div className={styles.container}>
          <AuthForm signinMode={signinMode} />
        </div>
      </Wrapper>
    </div>
  );
};
export default AuthPage;
