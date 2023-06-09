import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Styles
import styles from '../../assets/css/layout/Navigation.module.css';

// Components
import { layoutActions } from '../../store/layout/layoutSlice';

const NavigationTop = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);

  const editProfileHandler = () => {
    dispatch(layoutActions.setShowProfileForm(true));
  }

  return (
    <nav className={styles.navigation}>
      <div className={styles.navigationProfile}>
        <div className={styles.headerText}>
          <div>Welcome,</div>
          <div 
            className={styles.headerMainText}
            onClick={editProfileHandler}
          >
            {user.username}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavigationTop;