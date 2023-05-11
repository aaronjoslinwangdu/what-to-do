import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

// Hooks
import usePersist from '../../hooks/usePersist';

// Styles
import styles from '../../assets/css/forms/LoginForm.module.css';

// Components
import Brand from '../layout/Brand';
import { authActions } from '../../store/auth/authSlice';
import { useLoginMutation } from '../../store/auth/authApiSlice';



const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();
  const [persist, setPersist] = usePersist();

  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState({
    empty: null,
    email: null,
    password: null,
  });

  const persistHandler = () => {
    setPersist(prev => !prev);
  }

  const changeHandler = (event) => {
    setFormState({
      ...formState,
      [event.target.name]: event.target.value
    });
    setFormErrors({
      ...formErrors,
      [event.target.name]: null
    })
  }

  const submitHandler = async (event) => {
    event.preventDefault();
    const { email, password } = formState;

    try {
      const { accessToken, user } = await login({ email, password }).unwrap();
      dispatch(authActions.setCredentials({ accessToken, user }));
      setFormState({ email: "", password: "" });
      navigate('/dashboard');
    } catch (error) {

      if (error.status === 400) {
        setFormErrors({ ...formErrors, empty: error.data.message, email: null, password: null });
        return;
      } else if (error.status === 401) {
        if (error.data.message === 'Email not found') {
          setFormErrors({ ...formErrors, email: error.data.message, empty: null, password: null });
          setFormState({ ...formState, email: '', password: ''});
        } 
        if (error.data.message === 'Invalid password') {
          setFormErrors({ ...formErrors, password: error.data.message, empty: null, email: null });
          setFormState({ ...formState, password: ''});
        }
        return;
      }
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
        {formErrors.empty && <div className={styles.errorMessage}>{formErrors.empty}</div>}
        <label className={styles.labelRow} htmlFor='email'>
          Email
          {formErrors.email && <div className={styles.errorMessage}>{formErrors.email}</div>}
        </label>
        <input
          className={formErrors.email ? `${styles.errorInput}` : ''}
          onChange={changeHandler}
          value={formState.email}
          type='email'
          name='email'
          id='email'
          placeholder='Email address...'
        />
      </div>

      <div className={styles.inputSection}>
        <label className={styles.labelRow} htmlFor='password'>
          Password
          {formErrors.password && <div className={styles.errorMessage}>{formErrors.password}</div>}
        </label>
        <input
          className={formErrors.password ? `${styles.errorInput}` : ''}
          onChange={changeHandler}
          value={formState.password}
          type='password'
          name='password'
          id='password'
          placeholder='Password...'
        />
      </div>

      <div className={styles.buttonSection}>
        <label className={styles.rememberMessage} htmlFor='persist'>
        <input 
          type='checkbox'
          id='persist'
          onChange={persistHandler}
          checked={persist}
        />
          Remember me?
        </label>
        <div className={styles.buttonSubsection}>
          <Link to='/register'>Register</Link>
          <button type='submit'>Log in</button>
        </div>
      </div>

    </form>
  );
}

export default LoginForm;