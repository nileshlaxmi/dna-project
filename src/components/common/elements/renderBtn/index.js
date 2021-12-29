import React from 'react';
import { CONSTANTS } from 'constants/index';
import './style.scss';

const RenderBtn = ({ id, onClick, label, type, disabled }) => {
  return (
    <div className="button-box">
      <button
        id={id || ''}
        className={
          disabled
            ? `button-box__button ${type} disabled `
            : `button-box__button ${type}`
        }
        onClick={onClick}
        disabled={disabled}
      >
        {label ? label : CONSTANTS.submitBtn}
      </button>
    </div>
  );
};

export default RenderBtn;
