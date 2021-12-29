import React, { useState } from 'react';
import CustomPopUp from '../CustomPopUp';
import './index.scss';
import AlertIcon from 'assets/images/AlertIcon.svg';
import RenderInput from '../elements/renderInput';

const ConfirmationPopupWithRemark = ({
  isPopupOpen,
  message,
  handleClick,
  handleCancelClick,
  btnText,
  zIndex,
}) => {
  const [remark, updateRemark] = useState('');
  return (
    <div className="confirmation-root">
      <CustomPopUp
        isPopupOpen={isPopupOpen}
        popupClosed={handleCancelClick}
        containerClassname={'delete-popup'}
        zIndex={zIndex}
      >
        <img className="AlertIcon" src={AlertIcon} alt="" width="50px" height="50px" />
        <div className="confirmation-content">
          <div className="confirmation-subtitle">{message}</div>
          <RenderInput
            label="Remark"
            type="text"
            id="remark"
            property="remark"
            placeholder="Enter Remark (Optional)"
            value={remark}
            onChange={({ value }) => {
              updateRemark(value);
            }}
          // error={errors && errors['noise_threshold']}
          />
          <button onClick={() => handleClick(remark)} className="btn btn-secondary">
            {btnText || 'CONFIRM'}
          </button>
        </div>
      </CustomPopUp>
    </div>
  );
};

export default ConfirmationPopupWithRemark;
