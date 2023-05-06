import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Styles
import styles from '../../assets/css/forms/DeleteItemForm.module.css';

// Components 
import { itemActions } from '../../store/items/itemSlice';
import { layoutActions } from '../../store/layout/layoutSlice';
import { useDeleteItemMutation } from '../../store/items/itemsApiSlice';
import { useDeleteUserMutation } from '../../store/user/userApiSlice';
import { authActions } from '../../store/auth/authSlice';
import { userActions } from '../../store/user/userSlice';
import { useNavigate } from 'react-router-dom';


const DeleteItemForm = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const itemToDelete = useSelector(state => state.item.itemToDelete);
  const userToDelete = useSelector(state => state.user.userToDelete);
  const [deleteItem, { isDeleteItemLoading }] = useDeleteItemMutation();
  const [deleteUser, { isDeleteUserLoading}] = useDeleteUserMutation();

  const cancelHandler = () => {
    dispatch(layoutActions.setShowDeleteForm(false));
    dispatch(itemActions.setItemToDelete(null));
  }

  const deleteHandler = async (event) => {
    event.preventDefault()

    if (itemToDelete !== null) {
      const deletedItemId = await deleteItem(itemToDelete._id).unwrap();
      dispatch(itemActions.deleteItem(deletedItemId));
      dispatch(layoutActions.setShowDeleteForm(false));
      dispatch(itemActions.setItemToDelete(null));
    } else if (userToDelete !== null) {
      dispatch(authActions.logout());
      dispatch(layoutActions.setShowDeleteForm(false));
      dispatch(userActions.setUserToDelete(null));
      navigate('/register');
      const deletedUserId = await deleteUser(userToDelete.id).unwrap();
    }

  }

  let label;
  if (itemToDelete !== null) {
    label = <div className={styles.warningLabel}> {itemToDelete.label}?</div>
  } else if (userToDelete !== null) {
    label = <div className={styles.warningLabel}> {userToDelete.username}?</div>
  }

  return (
    <div className={styles.deleteItemForm}>
      <div className={styles.warning}>Are you sure you want to delete 
        {userToDelete && ' User:'}
        {itemToDelete && ' Item:'}
        </div>
      {label}
      <div className={styles.options}>
        <div className={styles.cancel} onClick={cancelHandler}>Cancel</div>
        <button className={styles.delete} onClick={deleteHandler}>Delete</button>
      </div>
    </div>
  );
};

export default DeleteItemForm;
