import styles from './AuthPage.module.css';
import Header from 'components/Header';
import Wrapper from 'components/Wrapper';
import AuthForm from 'pages/AuthPage/AuthForm';

const AuthPage = ({ loginMode }) => {
  return (
    <div className={styles.AuthPage}>
      <Header />
      <Wrapper>
        <div className={styles.container}>
          <AuthForm loginMode={loginMode} />
        </div>
      </Wrapper>
    </div>
  );
};
export default AuthPage;
