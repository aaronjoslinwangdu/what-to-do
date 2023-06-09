import React from 'react';
import ReactDOM from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';

// Styles
import styles from '../../assets/css/layout/Modal.module.css';

// Components 
import { layoutActions } from '../../store/layout/layoutSlice';
import { itemActions } from '../../store/items/itemSlice';
import { userActions } from '../../store/user/userSlice';
import { formActions } from '../../store/form/formSlice';



const Modal = (props) => {
  const dispatch = useDispatch();

  const hideModalHandler = () => {
    dispatch(layoutActions.hideAllForms());
    dispatch(itemActions.setItemToDelete(null));
    dispatch(userActions.setUserToDelete(null));
    dispatch(formActions.setAddItemStatus(0));
  }

  const Backdrop = (props) => {
    return <div className={styles.backdrop} onClick={hideModalHandler}/>;
  };
  
  const ModalOverlay = (props) => {
    return (
      <div className={styles.modal}> 
        <div>{props.children}</div>
      </div>
    );
  };

  const portalElement = document.getElementById('overlays');

  return (
    <React.Fragment>
      {ReactDOM.createPortal(<Backdrop />, portalElement)}
      {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, portalElement)}
    </React.Fragment>
  );
};

export default Modal;