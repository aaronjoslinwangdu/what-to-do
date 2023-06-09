import React from 'react';

// Components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

// Styles
import styles from '../../assets/css/layout/Sidebar.module.css';

const Date = () => {
  return (
    <div className={styles.sidebarItem}>
      <FontAwesomeIcon icon={faPlus} size="2x"/>
      <div className={styles.sidebarItemLabel}>Date</div>
    </div>
  );
};

export default Date;