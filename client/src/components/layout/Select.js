import React from 'react';

// Components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons'

// Styles
import styles from '../../assets/css/layout/Sidebar.module.css';

const Select = () => {
  return (
    <div className={styles.sidebarItem}>
      <FontAwesomeIcon className={styles.sidebarItemIcon} icon={faCircleCheck} size="2x"/>
      <div className={styles.sidebarItemLabel}>Select</div>
    </div>
  );
};

export default Select;