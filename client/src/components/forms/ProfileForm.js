import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Styles
import styles from '../../assets/css/users/ProfileForm.module.css';

// Components
import { useGetUserQuery } from '../../store/user/userApiSlice';
import { layoutActions } from '../../store/layout/layoutSlice';
import { userActions } from '../../store/user/userSlice';


const ProfileForm = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  const [isEditing, setIsEditing] = useState(false);


  const deleteHandler = () => {
    dispatch(userActions.setUserToDelete(user));
    dispatch(layoutActions.setShowProfileForm(false));
    dispatch(layoutActions.setShowDeleteItemForm(true));
  }

  console.log(user);

  const profile = (
    <div>
    </div>
  )


  return (
    <div>
      <div>Welcome to your profile</div>
      <div onClick={deleteHandler}>
        Delete
      </div>
    </div>
    
  );
}

export default ProfileForm;