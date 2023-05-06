import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// Styles
import styles from '../../assets/css/forms/LoginForm.module.css';

// Components
import Brand from '../layout/Brand';
import { Link } from 'react-router-dom';
import { useRegisterMutation } from '../../store/auth/authApiSlice';
import { authActions } from '../../store/auth/authSlice';

const RegisterForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector(state => state.auth.user);

  const [register, { isLoading }] = useRegisterMutation();
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    location: "",
  });


  const changeHandler = (event) => {
    setFormState({
      ...formState,
      [event.target.name]: event.target.value
    });
  }


  const submitHandler = async (event) => {
    event.preventDefault();

    const createUser = {
      username: formState.username,
      email: formState.email,
      password: formState.password,
      location: formState.location
    }

    try {
      const { accessToken, user } = await register(createUser).unwrap();
      dispatch(authActions.setCredentials({ accessToken, user }));
      setFormState({ email: "", password: "", username: "", confirmPassword: "", firstName: "", lastName: "", location: "" });
      navigate('/dashboard');
    } catch (error) {
      throw new Error(error);
    }

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
        <label htmlFor='location'>Location</label>
        <input
          onChange={changeHandler}
          value={formState.location}
          type='text'
          name='location'
          id='location'
          placeholder='Enter your Location'
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