import React from 'react';
import './index.scss';
import TimeInput from 'components/common/elements/TimeInput';

const TimePickerSection = ({ startTime, endTime, onChange }) => (
  <div className="time-section-wrapper">
    <TimeInput
      label="From"
      time={startTime}
      onChange={(e, startTime) => onChange('startDate', e, startTime)}
    />
    <TimeInput
      label="To"
      time={endTime}
      onChange={(e, endTime) => onChange('endDate', e, endTime + ':59')}
    />
  </div>
);
export default TimePickerSection;
