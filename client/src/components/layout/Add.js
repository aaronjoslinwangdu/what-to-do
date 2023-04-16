import React from 'react';

// Redux 
import { useSelector } from 'react-redux';

// Components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

// Styles
import styles from '../../assets/css/layout/Sidebar.module.css';

const Add = (props) => {

  return (
    <div className={styles.sidebarItem}>
      <FontAwesomeIcon icon={faPlus} size="2x"/>
      <div className={styles.sidebarItemLabel}>Add</div>
    </div>
  );
};

export default Add;