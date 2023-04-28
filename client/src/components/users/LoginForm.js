import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';


// Styles
import styles from '../../assets/css/users/LoginForm.module.css';

// Components
import Brand from '../layout/Brand';
import { authActions } from '../../store/auth/authSlice';
import { useLoginMutation } from '../../store/auth/authApiSlice';


const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();
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

  const submitHandler = async (event) => {
    event.preventDefault();
    const { email, password } = formState;

    try {
      const accessToken = await login({ email, password }).unwrap();
      dispatch(authActions.setCredentials({ ...accessToken, email }));
      setFormState({ email: "", password: "" });
      navigate('/dashboard');
    } catch (error) {
      //console.log(error.data.message);
      throw new Error(error);
    }

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
        <Link to='/register'>Register</Link>
        <button type='submit'>Log in</button>
      </div>
    </form>
  );
}

export default LoginForm;