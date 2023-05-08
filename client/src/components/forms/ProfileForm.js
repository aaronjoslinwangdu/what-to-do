import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Styles
import styles from '../../assets/css/forms/ProfileForm.module.css';

// Components
import { useGetUserQuery } from '../../store/user/userApiSlice';
import { layoutActions } from '../../store/layout/layoutSlice';
import { userActions } from '../../store/user/userSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'


const ProfileForm = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  const [isEditing, setIsEditing] = useState(false);

  console.log(user)

  const deleteHandler = () => {
    dispatch(userActions.setUserToDelete(user));
    dispatch(layoutActions.setShowProfileForm(false));
    dispatch(layoutActions.setShowDeleteForm(true));
  }

  const editHandler = () => {
    console.log('start editing');

    setIsEditing(true);
  }

  const saveHandler = () => {
    console.log('save and stop editing');

    setIsEditing(false);
  }

  const cancelHandler = () => {
    dispatch(layoutActions.setShowProfileForm(false));
  }


  const profile = (
    <div className={styles.profileForm}>

      <div className={styles.headerSection}>
        <FontAwesomeIcon className={styles.profileIcon} icon={faUser} size="3x"/>
        <div className={styles.headerText}>Hello, {user.username}.</div>
      </div>

      <div className={styles.userSection}>
        <div className={styles.userSectionRow}>
          <div className={styles.userSectionLabel}>Username:</div>
          <div className={styles.userSectionText}>{user.username}</div>
        </div>
        <div className={styles.userSectionRow}>
          <div className={styles.userSectionLabel}>Email:</div>
          <div className={styles.userSectionText}>{user.email}</div>
        </div>
        <div className={styles.userSectionRow}>
          <div className={styles.userSectionLabel}>Location:</div>
          <div className={styles.userSectionText}>{user.location}</div>
        </div>
      </div>
      
      <div className={styles.buttonSection}>
        <div className={`${styles.profileButton} ${styles.cancel}`} onClick={cancelHandler}>
          Cancel
          </div>
        <div className={`${styles.profileButton} ${styles.edit}`} onClick={editHandler}>
          Edit
        </div>
        <div className={`${styles.profileButton} ${styles.delete}`} onClick={deleteHandler}>
          Delete
        </div>
      </div>

    </div>
  );

  const editProfile = (
    <div className={styles.profileForm}>

      <FontAwesomeIcon className={styles.profileIcon} icon={faUser} size="2x"/>

      <div className={styles.userSection}>

      </div>
      
      <div className={styles.buttonSection}>
        <div className={`${styles.profileButton} ${styles.cancel}`} onClick={cancelHandler}>
          Cancel
        </div>
        <div className={`${styles.profileButton} ${styles.edit}`} onClick={saveHandler}>
          Save
        </div>
        <div className={`${styles.profileButton} ${styles.delete}`} onClick={deleteHandler}>
          Delete
        </div>
      </div>

    </div>
  );


  return (
    <div>
      {!isEditing && profile}
      {isEditing && editProfile}
    </div>
    
  );
}

export default ProfileForm;