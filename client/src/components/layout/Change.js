import React from 'react';
import { useDispatch } from 'react-redux';

// Components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

// Styles
import styles from '../../assets/css/layout/Sidebar.module.css';
import { layoutActions } from '../../store/layout/layoutSlice';

const Change = () => {
  const dispatch = useDispatch();

  const registerHandler = () => {
    dispatch(layoutActions.showRegisterForm());
  }

  return (
    <div className={styles.sidebarItem} onClick={registerHandler}>
      <FontAwesomeIcon icon={faPlus} size="2x"/>
      <div className={styles.sidebarItemLabel}>Change</div>
    </div>
  );
};

export default Change;