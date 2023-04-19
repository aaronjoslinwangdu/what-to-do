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


const ItemPage = () => {
  const showAddItemForm = useSelector(state => state.layout.showAddItemForm);

  return (
    <Fragment>
      {showAddItemForm &&
        <Modal>
          <AddItemForm />
        </Modal>
      }
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