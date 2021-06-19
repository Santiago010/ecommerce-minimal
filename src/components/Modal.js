import React from "react";
import ReactDOM from "react-dom";
import "./styles/Modal.css";

const Modal = ({ onClose, children }) => {
  return ReactDOM.createPortal(
    <div className="Modal">
      <div className="modal__container">
        <button className="container__close" onClick={onClose}>
          <i className="fas fa-times"></i>
        </button>
        {children}
      </div>
    </div>,
    document.getElementById("modal")
  );
};

export default Modal;
