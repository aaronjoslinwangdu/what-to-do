import React from 'react';
import ReactDOM from 'react-dom';
import { useDispatch } from 'react-redux';

// Styles
import styles from '../../assets/css/layout/Modal.module.css';

// Components 
import { hideAddItemForm } from '../../store/layout/layoutSlice';



const Modal = (props) => {
  const dispatch = useDispatch();

  const hideAddItemFormHandler = () => {
    dispatch(hideAddItemForm());
  }

  const Backdrop = (props) => {
    return <div className={styles.backdrop} onClick={hideAddItemFormHandler}/>;
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