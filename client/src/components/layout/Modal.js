import React from 'react';
import ReactDOM from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';

// Styles
import styles from '../../assets/css/layout/Modal.module.css';

// Components 
import { layoutActions } from '../../store/layout/layoutSlice';



const Modal = (props) => {
  const dispatch = useDispatch();

  const hideModalHandler = () => {
    dispatch(layoutActions.hideAddItemForm());
    dispatch(layoutActions.hideDeleteItemForm());
    dispatch(layoutActions.hideLoginForm());
    dispatch(layoutActions.hideRegisterForm());
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