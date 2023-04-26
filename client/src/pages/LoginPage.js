import React from 'react';

// Styles
import styles from '../assets/css/pages/AuthPage.module.css';

// Components
import LoginForm from '../components/users/LoginForm';


const LoginPage = () => {

  return (
    <div className={styles.backdrop}>
      <div className={styles.formContainer}>
        <LoginForm />
      </div>
    </div>
  )
}

export default LoginPage;