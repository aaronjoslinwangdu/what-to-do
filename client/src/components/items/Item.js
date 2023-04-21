import React from 'react';
import { useDispatch } from 'react-redux';

// Styles
import styles from '../../assets/css/items/Item.module.css';

// Components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan, faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { showDeleteItemForm, setItemToDelete } from '../../store/layout/layoutSlice';


const Item = (props) => {
  const dispatch = useDispatch();
  const item = props.item;

  const deleteItemHandler = () => {
    dispatch(showDeleteItemForm());
    dispatch(setItemToDelete(item._id));
  }

  const editItemHandler = () => {
    console.log('hi');
  }

  return (
    <div className={styles.item}>
      <div className={styles.itemHeader}>
        <div className={styles.itemLabel}>{item.label}</div>
        <FontAwesomeIcon 
          className={styles.itemEdit}
          onClick={editItemHandler}
          icon={faPenToSquare} 
          />
        <FontAwesomeIcon 
          className={styles.itemDelete} 
          onClick={deleteItemHandler}
          icon={faTrashCan} 
        />
      </div>
      <div className={styles.itemDesc}>{item.description}</div>
    </div>
  );
};

export default Item;