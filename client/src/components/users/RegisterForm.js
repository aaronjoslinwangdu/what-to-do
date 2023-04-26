import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Styles
import styles from '../../assets/css/users/LoginForm.module.css';

// Components
import { layoutActions } from '../../store/layout/layoutSlice';
import Brand from '../layout/Brand';
import { authActions, registerUser } from '../../store/auth/authSlice';
import { Link } from 'react-router-dom';

const RegisterForm = () => {
  const dispatch = useDispatch();
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { token, isLoading, isError, isSuccess, message } =  useSelector(state => state.auth);


  const changeHandler = (event) => {
    setFormState({
      ...formState,
      [event.target.name]: event.target.value
    });
  }

  const cancelHandler = () => {
    dispatch(layoutActions.hideRegisterForm());
  }

  const submitHandler = async (event) => {
    event.preventDefault();
    console.log(formState);

 
    dispatch(layoutActions.hideRegisterForm());
  }

  return (
    <form className={styles.loginForm} onSubmit={submitHandler}>
      <div className={styles.headerSection}>
        <div>Register</div>
        <div className={styles.divider}>|</div>
        <Brand />
      </div>
      <div className={styles.inputSection}>
        <label htmlFor='username'>Username</label>
        <input
          onChange={changeHandler}
          value={formState.username}
          type='text'
          name='username'
          id='username'
          placeholder='Enter a username'
        />
      </div>
      <div className={styles.inputSection}>
        <label htmlFor='email'>Email</label>
        <input
          onChange={changeHandler}
          value={formState.email}
          type='email'
          name='email'
          id='email'
          placeholder='Enter an email address'
        />
      </div>
      <div className={styles.inputSection}>
        <label htmlFor='password'>Password</label>
        <input
          onChange={changeHandler}
          value={formState.password}
          type='password'
          name='password'
          id='password'
          placeholder='Enter a password'
        />
      </div>
      <div className={styles.inputSection}>
        <label htmlFor='confirmPassword'>Confirm password</label>
        <input
          onChange={changeHandler}
          value={formState.confirmPassword}
          type='password'
          name='confirmPassword'
          id='confirmPassword'
          placeholder='Confirm password'
        />
      </div>
      <div className={styles.buttonSection}>
        <Link to='/login'>Log in</Link>
        <button type='submit'>Create</button>
      </div>
    </form>
  );
}

export default RegisterForm;