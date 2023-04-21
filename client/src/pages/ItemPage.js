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


const ItemPage = () => {
  const showAddItemForm = useSelector(state => state.layout.showAddItemForm);
  const showDeleteItemForm = useSelector(state => state.layout.showDeleteItemForm);

  let modal;
  if (showAddItemForm && !showDeleteItemForm) {
    modal = <Modal><AddItemForm /></Modal>;
  } else if (showDeleteItemForm && !showAddItemForm) {
    modal = <Modal><DeleteItemForm /></Modal>
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