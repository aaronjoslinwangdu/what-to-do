import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Styles
import styles from '../../assets/css/users/ProfileForm.module.css';

// Components



const ProfileForm = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  const [isEditing, setIsEditing] = useState(false);

  console.log(user);

  const profile = (
    <div></div>
  )


  return (
    <div>ProfileForm</div>
  );
}

export default ProfileForm;