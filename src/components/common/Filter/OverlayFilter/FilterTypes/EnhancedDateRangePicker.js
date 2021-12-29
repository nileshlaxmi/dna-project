import React from 'react';
import moment from 'moment';
import DateRangePicker from 'components/common/DateRangePicker';
import { getSpecificFormattedDateTime } from 'utils/dateFormat';
import calendarIcon from 'assets/images/calendarIcon.svg';
import '../index.scss';

const EnhancedDateRangePicker = props => {
  const {
    label,
    fieldName,
    filters = {},
    onChange,
    type,
    isReset,
    limit90Days,
    rangePickerProps,
    containerClassname,
  } = props;
  const { startDate = '', endDate = '' } = filters;
  let value = null;
  if (startDate && endDate) {
    value = `${startDate} - ${endDate}`;
  }
  return (
    <div className={`grid-filter ${containerClassname || 'date-filter'}`}>
      <div className="column-name">{label}</div>
      <div className="date-range-picker-wrapper">
        {/* <img alt="Search" title="Search" width="20" src={calendarIcon} /> */}
        {/* {!isReset && (
          <DateRangePicker
            value={value}
            startDate={startDate.split('Z').join('')}
            endDate={endDate.split('Z').join('')}
            limit90Days={limit90Days}
            dateChangeHandler={(sDate, eDate, rangeLabel) => {
              const startDate = getSpecificFormattedDateTime(sDate);
              const endDate = getSpecificFormattedDateTime(eDate);
              onChange({ startDate, endDate, rangeLabel }, fieldName, type);
            }}
          />
        )} */}
        {!isReset && <DateRangePicker
          {...rangePickerProps}
          startDate={startDate}
          endDate={endDate}
          dateChangeHandler={(sDate, eDate, rangeLabel) => {
            onChange({ startDate: sDate, endDate: eDate }, fieldName, type);
          }}
        />}
      </div>
    </div>
  );
};

export default EnhancedDateRangePicker;
