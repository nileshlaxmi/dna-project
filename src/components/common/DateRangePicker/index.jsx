import React, { Component } from 'react';
import moment from 'moment';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import 'bootstrap-daterangepicker/daterangepicker.css';
import './index.scss';
import ReactDOM from 'react-dom';
import TimePickerSection from './TimePickerSection';
import { CalendarIcon } from 'assets/iconsComponent';

const iconColor = {
  show: '#248700',
  hide: '#71757B',
};
export class RangePicker extends Component {
  constructor(props) {
    super(props);
    const startDate = props.startDate
      ? moment(props.startDate)
      : moment().startOf('month');
    const endDate = props.endDate ? moment(props.endDate) : moment();
    this.state = {
      startDate,
      endDate,
      opens: 'left',
      isCalendarOpen: false,
    };
    this.rangePickerRef = React.createRef();
  }

  componentDidMount() {
    let datepicker = document.getElementsByClassName('daterangepicker');
    let dpbtn =
      datepicker &&
      datepicker.length > 0 &&
      datepicker[0].getElementsByClassName('drp-buttons')[0];

    if (dpbtn) {
      let applyBtn = dpbtn.innerHTML
      dpbtn.innerHTML = `<div class='btns-wrapper ${this.props.isTimeInputEnabled ? '' : 'w-100'}'>${applyBtn}</div>`
      const timePickerContainer = document.createElement('div');
      timePickerContainer.setAttribute('id', 'timepickercontainer');
      timePickerContainer.setAttribute('class', 'time-picker-container');
      if (this.props.isTimeInputEnabled) {
        dpbtn.prepend(timePickerContainer);
        this.renderTimePicker();
      }
    }
  }

  componentDidUpdate() {
    this.renderTimePicker();
  }
  handleTimeChange = (fieldName, event, value) => {
    this.setState(preState => ({
      [fieldName]: moment(
        moment(preState[fieldName]).format('L') + ' ' + value,
      ),
    }));
  };
  toggleCalendar = (event, picker) => {
    event.stopPropagation();
    this.setState({
      pickerState: event.type,
      isCalendarOpen: event.type === 'hide' ? false : true,
    });
  };

  handleApply = (event, picker) => {
    const { dateChangeHandler, isTimeInputEnabled } = this.props;
    event.stopPropagation();
    const preState = this.state;

    const parseStartDate = () => {
      let startDate=moment(picker.startDate).format('L');
      let startTime='00:00:00';
      if(isTimeInputEnabled){
        startTime = moment(preState.startDate).format('HH:mm:ss')
      }
      return moment(`${startDate} ${startTime}`);
    }

    const parseEndDate = () => {
      let endDate=moment(picker.endDate).format('L');
      let endTime='23:59:59';
      if(isTimeInputEnabled){
        endTime = moment(preState.endDate).format('HH:mm:ss')
      } else if(moment().diff(endDate, 'days') === 0){
        endTime = moment().format('HH:mm:ss')
      }
      return moment(`${endDate} ${endTime}`);
    }

    this.setState(
      {
        startDate: parseStartDate(),
        endDate: parseEndDate(),
      },
      () => {
        dateChangeHandler &&
          dateChangeHandler(
            this.state.startDate,
            this.state.endDate,
            picker.chosenLabel,
          );
      },
    );
  };

  renderTimePicker = () => {
    const timePickerContainer = document.querySelector('#timepickercontainer');
    if (timePickerContainer) {
      ReactDOM.render(
        <TimePickerSection
          startTime={this.state.startDate.format('HH:mm')}
          endTime={this.state.endDate.format('HH:mm')}
          onChange={this.handleTimeChange}
        />,
        timePickerContainer,
      );
    }
  };

  render() {
    const {
      startDate,
      endDate,
      opens,
      pickerState,
      isCalendarOpen,
    } = this.state;
    const {
      isDisabled,
      maxDate,
      minDate,
      isIconInput,
      svgIcon,
      ranges,
      format = 'DD-MMM-YYYY',
      isTimeInputEnabled,
      isCalledFromFilter = false,
      isAutoUpdateInput = true
    } = this.props;
    let value =
      this.props.startDate && this.props.endDate
        ? `${moment(startDate).format(format)} - ${moment(endDate).format(
          format,
        )}`
        : '';
    return (
      <div style={{ flex: 0 }}>
        <div
          className={`dropdown range-picker-wrapper calendar  ${isDisabled ? 'disabled' : ''
            } ${isIconInput ? 'icon-input' : ''}`}
        >
          <DateRangePicker
            initialSettings={{
              autoUpdateInput: isAutoUpdateInput,
              timePicker: isTimeInputEnabled,
              startDate: startDate,
              endDate: endDate,
              ranges: ranges,
              opens: opens,
              maxDate: maxDate,
              minDate: minDate,
              alwaysShowCalendars: true,
              showCustomRangeLabel: true,
              // showDropdowns: true,
              linkedCalendars: true,
              locale: {
                daysOfWeek: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
                // monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                format: 'DD-MMM-YYYY',
                // format: format || 'DD-MMM-YYYY',
                fromLabel: 'From',
                toLabel: 'To',
                weekLabel: 'W',
              },
            }}
            onApply={this.handleApply}
            onShow={this.toggleCalendar}
            onHide={this.toggleCalendar}
          >
            <div className="w-100 input-wrapper">
                <input
                  ref={this.rangePickerRef}
                  type="text"
                  disabled={!!isDisabled}
                  className={`date-range-input ${pickerState === 'show' ? 'active' : ''
                    }`}
                  value={value}
                  name="daterange"
                  placeholder="Select Range"
                  readOnly
                />
            </div>
          </DateRangePicker>
          <span className="calendar-icon" ref={this.rangePickerRef}>
            {svgIcon ? (
              <img src={svgIcon} width={'100%'} height={'100%'} />
            ) : (
              <CalendarIcon fillColor={iconColor[pickerState]} />
            )}
          </span>
        </div>
      </div>
    );
  }
}
export default RangePicker;
