import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Styles
import styles from '../../assets/css/items/DeleteItemForm.module.css';

// Components 
import { hideDeleteItemForm, setItemToDelete } from '../../store/layout/layoutSlice';
import { deleteItem } from '../../utils/Api';


const DeleteItemForm = (props) => {
  const dispatch = useDispatch();
  const itemToDelete = useSelector(state => state.layout.itemToDelete);

  const cancelHandler = () => {
    dispatch(hideDeleteItemForm());
    dispatch(setItemToDelete(null));
  }

  const deleteHandler = (event) => {
    event.preventDefault()
    deleteItem(itemToDelete);
    dispatch(hideDeleteItemForm());
    dispatch(setItemToDelete(null));
  }

  return (
    <div className={styles.deleteItemForm}>
      <div className={styles.warning}>Are you sure that you want to DELETE this item?</div>
      <div className={styles.options}>
        <div className={styles.cancel} onClick={cancelHandler}>Cancel</div>
        <button className={styles.delete} onClick={deleteHandler}>Delete</button>
      </div>
    </div>
  );
};

export default DeleteItemForm;
