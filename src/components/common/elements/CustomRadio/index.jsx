import React from 'react';
import withError from 'utils/errorHoc';
import './index.scss';

const CustomRadio = ({ isChecked, name, handleSelect, label }) => {
  return (
    <label className="custom-radio">
      <input
        type="radio"
        name={name}
        checked={isChecked}
        onChange={() => handleSelect()}
      />
      <span className="custom-radio-btn"></span>
      {label}
    </label>
  );
};

export default withError(CustomRadio);
