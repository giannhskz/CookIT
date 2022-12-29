import React, { useState } from 'react';

const Modal = ({ children, isOpen, onClose }) => {
  const [modalIsOpen, setModalIsOpen] = useState(isOpen);

  const handleClose = () => {
    setModalIsOpen(false);
    onClose();
  };

  return (
    <>
      {modalIsOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            {children}
            <button onClick={handleClose}>Close</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;