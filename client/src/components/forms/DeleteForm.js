import React, { useState } from 'react';
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
import Spinner from '../layout/Spinner';


const DeleteItemForm = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
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
      try {
        setIsLoading(true);
        const deletedItemId = await deleteItem(itemToDelete._id).unwrap();
        dispatch(itemActions.deleteItem(deletedItemId));
        dispatch(layoutActions.setShowDeleteForm(false));
        dispatch(itemActions.setItemToDelete(null));
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }

    } else if (userToDelete !== null) {
      try {
        setIsLoading(true);
        dispatch(authActions.logout());
        dispatch(layoutActions.setShowDeleteForm(false));
        dispatch(userActions.setUserToDelete(null));
        navigate('/register');
        const deletedUserId = await deleteUser(userToDelete.id).unwrap();
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }

    }

  }

  let label;
  if (itemToDelete !== null) {
    label = <div className={styles.warningLabel}> {itemToDelete.label}?</div>
  } else if (userToDelete !== null) {
    label = <div className={styles.warningLabel}> {userToDelete.username}?</div>
  }

  return (
    <>
    {isLoading && <Spinner />}
    {!isLoading &&
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
    }
    </>
  );
};

export default DeleteItemForm;
