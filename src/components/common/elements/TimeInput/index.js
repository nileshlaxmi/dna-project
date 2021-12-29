import React, { Component } from 'react';
import './style.scss';
import TimeField from 'react-simple-timefield';

const TimeInput = ({ label, time, onChange }) => {
  return (
    <div className="time-input-wrapper">
      <label>{label}:</label>
      <TimeField value={time} onChange={onChange} />
    </div>
  );
};
export default TimeInput;
