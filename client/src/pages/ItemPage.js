import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';

// Styles
import styles from '../assets/css/pages/ItemPage.module.css';

// Components
import Navigation from '../components/layout/Navigation';
import Main from '../components/layout/Main';
import Sidebar from '../components/layout/Sidebar';
import Modal from '../components/layout/Modal';
import AddItemForm from '../components/forms/AddItemForm';
import DeleteForm from '../components/forms/DeleteForm';
import LoginForm from '../components/forms/LoginForm';
import RegisterForm from '../components/forms/RegisterForm';
import ProfileForm from '../components/forms/ProfileForm';


const ItemPage = () => {
  const showAddItemForm = useSelector(state => state.layout.showAddItemForm);
  const showDeleteForm = useSelector(state => state.layout.showDeleteForm);
  const showProfileForm = useSelector(state => state.layout.showProfileForm);
  const showLoginForm = useSelector(state => state.layout.showLoginForm);
  const showRegisterForm = useSelector(state => state.layout.showRegisterForm);

  let modal;
  if (showAddItemForm) {
    modal = <Modal><AddItemForm /></Modal>
  } else if (showDeleteForm) {
    modal = <Modal><DeleteForm /></Modal>
  } else if (showProfileForm) {
    modal = <Modal><ProfileForm /></Modal>
  }

  return (
    <div className={styles.itemPage}>
      {modal}
      <div className={styles.regionSidebar}>
        <Sidebar />
      </div>
      <div className={styles.regionContent}>
        <div className={styles.regionNav}>
          <Navigation />
        </div>
        <div className={styles.regionMain}>
          <Main />
        </div>
      </div>
    </div>
  );
};

export default ItemPage;