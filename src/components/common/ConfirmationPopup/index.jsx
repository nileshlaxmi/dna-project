import React from 'react';
import CustomPopUp from '../CustomPopUp';
import './index.scss';
import AlertIcon from 'assets/images/AlertIcon.svg';

const ConfirmationPopup = ({
  isPopupOpen,
  message,
  handleClick,
  handleCancelClick,
  btnText,
  zIndex,
}) => {
  return (
    <div className="delete-confirmation-root">
      <CustomPopUp
        isPopupOpen={isPopupOpen}
        popupClosed={handleCancelClick}
        containerClassname={'delete-popup'}
        zIndex={zIndex}
      >
        <img
          className="AlertIcon"
          src={AlertIcon}
          alt=""
          width="50px"
          height="50px"
        ></img>
        <div className="delete-confirmation-content">
          <div className="delete-confirmation-title">Confirmation</div>
          <div className="delete-confirmation-subtitle">{message}</div>

          <button onClick={handleClick} className="btn btn-secondary">
            {btnText || 'CONFIRM'}
          </button>
        </div>
      </CustomPopUp>
    </div>
  );
};

export default ConfirmationPopup;
