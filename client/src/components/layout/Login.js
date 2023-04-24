import React from 'react';
import { useDispatch } from 'react-redux';

// Styles
import styles from '../../assets/css/layout/Sidebar.module.css';

// Components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons'
import { showLoginForm } from '../../store/layout/layoutSlice';


const Login = () => {
  const dispatch = useDispatch();

  const loginHandler = () => {
    dispatch(showLoginForm());
  }

  return (
    <div className={styles.sidebarItem} onClick={loginHandler}>
      <FontAwesomeIcon icon={faRightToBracket} />
      <div className={styles.sidebarItemLabel}>Login</div>
    </div>
  );
}

export default Login;