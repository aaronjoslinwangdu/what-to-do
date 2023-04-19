import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Styles
import styles from '../../assets/css/layout/Sidebar.module.css';

// Components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { showAddItemForm } from '../../store/layout/layoutSlice';


const Add = (props) => {
  const dispatch = useDispatch();

  const addItemHandler = () => {
    dispatch(showAddItemForm());
  }

  return (
    <div className={styles.sidebarItem} onClick={addItemHandler}>
      <FontAwesomeIcon icon={faPlus} size="2x"/>
      <div className={styles.sidebarItemLabel}>Add</div>
    </div>
  );
};

export default Add;