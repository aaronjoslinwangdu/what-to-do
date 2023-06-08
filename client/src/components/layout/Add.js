import React from 'react';
import { useDispatch } from 'react-redux';

// Styles
import styles from '../../assets/css/layout/Add.module.css';

// Components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { layoutActions } from '../../store/layout/layoutSlice';
import { formActions } from '../../store/form/formSlice';


const Add = ({ type, status }) => {
  const dispatch = useDispatch();

  const addItemHandler = () => {
    if (status) {
      dispatch(formActions.setAddItemStatus(status));
    }
    dispatch(layoutActions.setShowAddItemForm(true));
  }

  let containerStyle;
  let iconStyle;
  let labelStyle;

  switch (type) {
    case 'sidebar':
      containerStyle = `${styles.addSidebarContainer}`;
      iconStyle = `${styles.addSidebarIcon}`;
      labelStyle = `${styles.addSidebarLabel}`;
      break;
    case 'column':
      containerStyle = `${styles.addColumnContainer}`;
      iconStyle = `${styles.addColumnIcon}`;
      labelStyle = `${styles.addColumnLabel}`;
      break;
    default:
      break;
  }


  return (
    <div className={containerStyle} onClick={addItemHandler}>
      <FontAwesomeIcon className={iconStyle} icon={faPlus} size="2x"/>
      <div className={labelStyle}>Add</div>
    </div>
  );
};

export default Add;