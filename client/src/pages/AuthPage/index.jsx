import axios from 'axios';
import { useState, useEffect } from 'react';
import styles from './style.module.css';
import Header from 'components/Header';
import Wrapper from 'components/Wrapper';
import AuthForm from 'pages/AuthPage/AuthForm';

const AuthPage = ({ isLoginMode }) => {
  return (
    <div className={styles.AuthPage}>
      <Header />
      <Wrapper>
        <AuthForm isLoginMode={isLoginMode} />
      </Wrapper>
    </div>
  );
};
export default AuthPage;
