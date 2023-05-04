import React from 'react';
import { useDispatch } from 'react-redux';

// Styles
import styles from '../../assets/css/layout/Sidebar.module.css';

// Components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { layoutActions } from '../../store/layout/layoutSlice';


const Add = () => {
  const dispatch = useDispatch();

  const addItemHandler = () => {
    dispatch(layoutActions.showAddItemForm());
  }

  return (
    <div className={styles.sidebarItem} onClick={addItemHandler}>
      <FontAwesomeIcon className={styles.sidebarItemIcon} icon={faPlus} size="2x"/>
      <div className={styles.sidebarItemLabel}>Add</div>
    </div>
  );
};

export default Add;