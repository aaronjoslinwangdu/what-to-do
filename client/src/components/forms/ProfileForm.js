import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Styles
import styles from '../../assets/css/forms/ProfileForm.module.css';

// Components
import { useUpdateUserMutation } from '../../store/user/userApiSlice';
import { layoutActions } from '../../store/layout/layoutSlice';
import { userActions } from '../../store/user/userSlice';
import { authActions } from '../../store/auth/authSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import Spinner from '../layout/Spinner';



const ProfileForm = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [updateUser, { isUpdateUserLoading, isSuccess }] = useUpdateUserMutation();

  const [formState, setFormState] = useState({
    username: user.username,
    email: user.email,
    location: user.location,
  });

  const [formErrors, setFormErrors] = useState({
    username: null,
    email: null,
    location: null,
  });

  const changeHandler = (event) => {
    setFormState({
      ...formState,
      [event.target.name]: event.target.value
    });
    setFormErrors({
      ...formErrors, 
      [event.target.name]: null
    });
  }


  const deleteHandler = () => {
    dispatch(userActions.setUserToDelete(user));
    dispatch(layoutActions.setShowProfileForm(false));
    dispatch(layoutActions.setShowDeleteForm(true));
  }

  const editHandler = () => {
    setIsEditing(true);
  }

  const saveHandler = async (event) => {
    event.preventDefault();

    const userWithUpdates = {
      id: user.id,
      username: formState.username,
      email: formState.email,
      location: formState.location
    }

    try {
      setIsLoading(true);
      const updatedUser = await updateUser(userWithUpdates).unwrap();
      dispatch(authActions.setUser(updatedUser));
      setFormErrors({ username: null, email: null, location: null});
      setIsEditing(false);
    } catch (error) {
      
      if (error.data.type === 'username') {
        setFormState({ ...formState, username: user.username });
        setFormErrors({ ...formErrors, username: error.data.message });
        return;
      }

      if (error.data.type === 'email') {
        setFormState({ ...formState, email: user.email });
        setFormErrors({ ...formErrors, email: error.data.message });
        return;
      }

    } finally {
      setIsLoading(false);
    }

  }

  const cancelHandler = () => {
    dispatch(layoutActions.setShowProfileForm(false));
  }


  const profile = (
    <div className={styles.profileForm}>

      <div className={styles.headerSection}>
        <FontAwesomeIcon className={styles.profileIcon} icon={faUser} size="3x"/>
        <div className={styles.headerText}>
          <div>Hello,</div>
          <div className={styles.headerMainText}>{user.username}</div>
        </div>
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
    <form className={styles.profileForm} onSubmit={saveHandler}>

      <div className={styles.headerSection}>
        <FontAwesomeIcon className={styles.profileIcon} icon={faUser} size="3x"/>
        <div className={styles.headerText}>
          <div>Editing Profile</div>
        </div>
      </div>

      <div className={styles.userSection}>
        <div className={styles.userSectionRow}>
          <label className={styles.userSectionLabel} htmlFor='username'>Username</label>
          {formErrors.username && 
            <div className={styles.errorMessage}>{formErrors.username}</div>
          }
        </div>
        <input
          className={formErrors.username ? `${styles.errorInput}` : `${styles.input}`}
          onChange={changeHandler}
          value={formState.username}
          type='text'
          name='username'
          id='username'
        />
      </div>

      <div className={styles.inputSection}>
        <div className={styles.userSectionRow}>
          <label className={styles.userSectionLabel} htmlFor='email'>Email</label>
          {formErrors.email && 
            <div className={styles.errorMessage}>{formErrors.email}</div>
          }
        </div>
        <input
          className={formErrors.email ? `${styles.errorInput}` : `${styles.input}`}
          onChange={changeHandler}
          value={formState.email}
          type='email'
          name='email'
          id='email'
        />
      </div>

      <div className={styles.inputSection}>
        <div className={styles.userSectionRow}>  
          <label className={styles.userSectionLabel} htmlFor='location'>Location</label>
          {formErrors.location && 
            <div className={styles.errorMessage}>{formErrors.location}</div>
          }
        </div>
        <input
          className={formErrors.location ? `${styles.errorInput}` : `${styles.input}`}
          onChange={changeHandler}
          value={formState.location}
          type='text'
          name='location'
          id='location'
          placeholder='Enter your Location'
        />
      </div>
      
      <div className={styles.buttonSection}>
        <div className={`${styles.profileButton} ${styles.cancel}`} onClick={cancelHandler}>
          Cancel
        </div>
        <button type="submit" className={`${styles.profileButton} ${styles.edit}`} >
          Save
        </button>
        <div className={`${styles.profileButton} ${styles.delete}`} onClick={deleteHandler}>
          Delete
        </div>
      </div>

    </form>
  );


  return (


    <div>
      {isLoading && <Spinner />}
      {!isLoading && !isEditing&& profile}
      {!isLoading && isEditing && editProfile}
    </div>
    
  );
}

export default ProfileForm;