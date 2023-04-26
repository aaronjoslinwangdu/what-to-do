import React from 'react';

// Styles
import styles from '../assets/css/pages/AuthPage.module.css';

// Components
import RegisterForm from '../components/users/RegisterForm';



const RegisterPage = () => {

  return (
    <div className={styles.backdrop}>
      <div className={styles.formContainer}>
        <RegisterForm />
      </div>
    </div>
  )
}

export default RegisterPage;