import axios from 'axios';
import { useState, useEffect } from 'react';
import styles from './style.module.css';
import Logo from 'components/Logo';

const RegisterLogin = () => {
  useEffect(() => {
    axios
      .post(
        'http://localhost:3100/users/login',
        {
          email: 'test@test.fr',
          password: 'Test-123456'
        },
        { withCredentials: true }
      )
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <h1>Register Login</h1>
    </div>
  );
};
export default RegisterLogin;
