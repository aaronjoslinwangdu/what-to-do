import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Styles
import styles from '../../assets/css/items/DeleteItemForm.module.css';

// Components 
import { itemActions } from '../../store/items/itemSlice';
import { layoutActions } from '../../store/layout/layoutSlice';
import { useDeleteItemMutation } from '../../store/items/itemsApiSlice';


const DeleteItemForm = (props) => {
  const dispatch = useDispatch();
  const itemToDelete = useSelector(state => state.layout.itemToDelete);
  const [deleteItem, { isLoading }] = useDeleteItemMutation();

  const cancelHandler = () => {
    dispatch(layoutActions.setShowDeleteItemForm(false));
    dispatch(layoutActions.setItemToDelete(null));
  }

  const deleteHandler = async (event) => {
    event.preventDefault()
    const deletedItemId = await deleteItem(itemToDelete._id).unwrap();
    dispatch(itemActions.deleteItem(deletedItemId));
    dispatch(layoutActions.setShowDeleteItemForm(false));
    dispatch(layoutActions.setItemToDelete(null));
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
