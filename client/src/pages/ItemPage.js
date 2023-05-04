import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';

// Styles
import styles from '../assets/css/pages/ItemPage.module.css';

// Components
import Navigation from '../components/layout/Navigation';
import Main from '../components/layout/Main';
import Sidebar from '../components/layout/Sidebar';
import Modal from '../components/layout/Modal';
import AddItemForm from '../components/items/AddItemForm';
import DeleteItemForm from '../components/items/DeleteItemForm';
import LoginForm from '../components/users/LoginForm';
import RegisterForm from '../components/users/RegisterForm';
import ProfileForm from '../components/users/ProfileForm';


const ItemPage = () => {
  const showAddItemForm = useSelector(state => state.layout.showAddItemForm);
  const showDeleteItemForm = useSelector(state => state.layout.showDeleteItemForm);
  const showProfileForm = useSelector(state => state.layout.showProfileForm);
  const showLoginForm = useSelector(state => state.layout.showLoginForm);
  const showRegisterForm = useSelector(state => state.layout.showRegisterForm);

  let modal;
  if (showAddItemForm) {
    modal = <Modal><AddItemForm /></Modal>
  } else if (showDeleteItemForm) {
    modal = <Modal><DeleteItemForm /></Modal>
  } else if (showProfileForm) {
    modal = <Modal><ProfileForm /></Modal>
  }

  return (
    <Fragment>
      {modal}
      <div className={styles.regionSidebar}>
        <Sidebar />
        <div className={styles.regionContent}>
          <Navigation />
          <Main />
        </div>
      </div>
    </Fragment>
  );
};

export default ItemPage;