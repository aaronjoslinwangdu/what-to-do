import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Styles
import styles from '../../assets/css/users/LoginForm.module.css';

// Components
import { layoutActions } from '../../store/layout/layoutSlice';
import Brand from '../layout/Brand';


const LoginForm = () => {
  const dispatch = useDispatch();
  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });

  const changeHandler = (event) => {
    setFormState({
      ...formState,
      [event.target.name]: event.target.value
    });
  }

  const cancelHandler = () => {
    dispatch(layoutActions.hideLoginForm());
  }

  const submitHandler = (event) => {
    event.preventDefault();
    console.log(formState);
    dispatch(layoutActions.hideLoginForm());
  }

  return (
    <form className={styles.loginForm} onSubmit={submitHandler}>
      <div className={styles.headerSection}>
        <div>Log in</div>
        <div className={styles.divider}>|</div>
        <Brand />
      </div>
      <div className={styles.inputSection}>
        <label htmlFor='email'>Email</label>
        <input
          onChange={changeHandler}
          value={formState.email}
          type='email'
          name='email'
          id='email'
          placeholder='Email address...'
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
          placeholder='Password...'
        />
      </div>
      <div className={styles.buttonSection}>
        <div onClick={cancelHandler}>Cancel</div>
        <button type='submit'>Login</button>
      </div>
    </form>
  );
}

export default LoginForm;