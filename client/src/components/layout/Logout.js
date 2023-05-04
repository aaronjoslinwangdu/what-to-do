import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// Styles
import styles from '../../assets/css/layout/Sidebar.module.css';

// Components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons'
import { authActions } from '../../store/auth/authSlice';
import { useLogoutMutation } from '../../store/auth/authApiSlice';
import { itemActions } from '../../store/items/itemSlice';


const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logout, { isLoading }] = useLogoutMutation();

  const logoutHandler = async () => {
    await logout();
    dispatch(itemActions.setItems([]));
    dispatch(authActions.logout());
    navigate('/login');
  }

  return (
    <div className={styles.sidebarItem} onClick={logoutHandler}>
      <FontAwesomeIcon className={styles.sidebarItemIcon} icon={faRightToBracket} size='2x'/>
      <div className={styles.sidebarItemLabel}>Log out</div>
    </div>
  );
}

export default Logout;