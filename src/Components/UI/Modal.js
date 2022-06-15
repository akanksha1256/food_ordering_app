import React from 'react';
import ReactDOM from 'react-dom';
import classes from './Modal.module.css';

const ModalOverlay = (props) => {
  return (
    <div className={classes.backdrop} onClick={props.closeCartModal}></div>
  );
};

const ModalContent = (props) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

const Modal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <ModalOverlay closeCartModal={props.closeCartModal} />,
        document.getElementById('modal-overlay')
      )}
      {ReactDOM.createPortal(
        <ModalContent>{props.children}</ModalContent>,
        document.getElementById('modal-content')
      )}
    </>
  );
};

export default Modal;
