import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { itemActions } from '../../store/items/itemSlice';

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

  const deleteHandler = async (event) => {
    event.preventDefault()
    const deletedItemId = await deleteItem(itemToDelete._id);
    dispatch(itemActions.deleteItem(deletedItemId));
    dispatch(hideDeleteItemForm());
    dispatch(setItemToDelete(null));
  }

  return (
    <div className={styles.deleteItemForm}>
      <div className={styles.warning}>Are you sure you want to delete </div>
      <div className={styles.warningLabel}>{itemToDelete.label}?</div>
      <div className={styles.options}>
        <div className={styles.cancel} onClick={cancelHandler}>Cancel</div>
        <button className={styles.delete} onClick={deleteHandler}>Delete</button>
      </div>
    </div>
  );
};

export default DeleteItemForm;
