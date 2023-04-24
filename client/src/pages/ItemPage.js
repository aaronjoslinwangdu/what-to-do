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


const ItemPage = () => {
  const showAddItemForm = useSelector(state => state.layout.showAddItemForm);
  const showDeleteItemForm = useSelector(state => state.layout.showDeleteItemForm);
  const showLoginForm = useSelector(state => state.layout.showLoginForm);

  let modal;
  if (showAddItemForm) {
    modal = <Modal><AddItemForm /></Modal>;
  } else if (showDeleteItemForm) {
    modal = <Modal><DeleteItemForm /></Modal>;
  } else if (showLoginForm) {
    modal = <Modal><LoginForm /></Modal>
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