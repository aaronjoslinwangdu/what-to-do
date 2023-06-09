import React from 'react';
import { useDispatch } from 'react-redux';

// Components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'

// Styles
import styles from '../../assets/css/layout/Sidebar.module.css';
import { layoutActions } from '../../store/layout/layoutSlice';

const Profile = () => {
  const dispatch = useDispatch();

  const profileHandler = () => {
    dispatch(layoutActions.setShowProfileForm(true));
  }

  return (
    <div className={styles.sidebarItem} onClick={profileHandler}>
      <FontAwesomeIcon className={styles.sidebarItemIcon} icon={faUser} size="2x"/>
      <div className={styles.sidebarItemLabel}>Profile</div>
    </div>
  );
};

export default Profile;