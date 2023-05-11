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

  const [formErrors, setFormErrors] = useState({
    username: null,
    email: null,
    location: null,
    password: null,
    confirmPassword: null
  });

  const changeHandler = (event) => {
    setFormState({
      ...formState,
      [event.target.name]: event.target.value
    });
    setFormErrors({
      ...formErrors, 
      [event.target.name]: null
    });
  }


  const submitHandler = async (event) => {
    event.preventDefault();

    if (formState.password !== formState.confirmPassword) {
      setFormState({ ...formState, password: '', confirmPassword: '' });
      setFormErrors({ ...formErrors, password: 'Passwords must match', confirmPassword: true });
      return;
    }

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

      if (error.status === 400) {

        if (error.data.type === 'username') {
          setFormState({ ...formState, username: '' });
          setFormErrors({ ...formErrors, username: error.data.message });
          return;
        }

        if (error.data.type === 'email') {
          setFormState({ ...formState, email: '' });
          setFormErrors({ ...formErrors, email: error.data.message });
          return;
        }

        if (error.data.type === 'password') {
          setFormState({ ...formState, password: '', confirmPassword: '' });
          setFormErrors({ ...formErrors, password: error.data.message });
          return;
        }
        
      }
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
        <div className={styles.labelRow}>
          <label htmlFor='username'>Username</label>
          {formErrors.username && 
            <div className={styles.errorMessage}>{formErrors.username}</div>
          }
        </div>
        <input
          className={formErrors.username ? `${styles.errorInput}` : ''}
          onChange={changeHandler}
          value={formState.username}
          type='text'
          name='username'
          id='username'
          placeholder='Enter a username'
        />
      </div>

      <div className={styles.inputSection}>
        <div className={styles.labelRow}>
          <label htmlFor='email'>Email</label>
          {formErrors.email && 
            <div className={styles.errorMessage}>{formErrors.email}</div>
          }
        </div>
        <input
          className={formErrors.email ? `${styles.errorInput}` : ''}
          onChange={changeHandler}
          value={formState.email}
          type='email'
          name='email'
          id='email'
          placeholder='Enter an email address'
        />
      </div>

      <div className={styles.inputSection}>
        <div className={styles.labelRow}>  
          <label htmlFor='location'>Location</label>
          {formErrors.location && 
            <div className={styles.errorMessage}>{formErrors.location}</div>
          }
        </div>
        <input
          className={formErrors.location ? `${styles.errorInput}` : ''}
          onChange={changeHandler}
          value={formState.location}
          type='text'
          name='location'
          id='location'
          placeholder='Enter your Location'
        />
      </div>

      <div className={styles.inputSection}>
        <div className={styles.labelRow}>  
          <label htmlFor='password'>Password</label>
          {formErrors.password && 
            <div className={styles.errorMessage}>{formErrors.password}</div>
          }
        </div>
        <input
          className={formErrors.password ? `${styles.errorInput}` : ''}
          onChange={changeHandler}
          value={formState.password}
          type='password'
          name='password'
          id='password'
          placeholder='Enter a password'
        />
      </div>

      <div className={styles.inputSection}>
        <div className={styles.labelRow}>
          <label htmlFor='confirmPassword'>Confirm password</label>
        </div>
        <input
          className={formErrors.password ? `${styles.errorInput}` : ''}
          onChange={changeHandler}
          value={formState.confirmPassword}
          type='password'
          name='confirmPassword'
          id='confirmPassword'
          placeholder='Confirm password'
        />
      </div>

      <div className={styles.buttonSectionRegister}>
          <Link to='/login'>Log in</Link>
          <button type='submit'>Create</button>
      </div>

    </form>
  );
}

export default RegisterForm;