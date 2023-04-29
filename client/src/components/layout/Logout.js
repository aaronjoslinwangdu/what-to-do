import React from 'react';
import { useDispatch } from 'react-redux';

// Styles
import styles from '../../assets/css/layout/Sidebar.module.css';

// Components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons'
import { authActions } from '../../store/auth/authSlice';
import { useLogoutMutation } from '../../store/auth/authApiSlice';


const Logout = () => {
  const dispatch = useDispatch();
  const [logout, { isLoading }] = useLogoutMutation();

  const logoutHandler = async () => {
    await logout();
    dispatch(authActions.logout());
  }

  return (
    <div className={styles.sidebarItem} onClick={logoutHandler}>
      <FontAwesomeIcon icon={faRightToBracket} size='2x'/>
      <div className={styles.sidebarItemLabel}>Log out</div>
    </div>
  );
}

export default Logout;