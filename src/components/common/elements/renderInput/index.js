import React, { Component } from 'react';
import './style.scss';
import errorIcon from '../../../../assets/images/icon-error.svg';

class RenderInput extends Component {
  static defaultProps = {
    _key: 'value',
    label: '',
    error: null,
    value: '',
    placeholder: '',
    disabled: false,
  };

  onChange = event => {
    const { type } = this.props;
    const { target } = event;
    const { value } = target;
    let _value = type === 'number' ? parseInt(value, 10) : value;
    this.props.onChange({
      [this.props._key]: _value,
    });
  };

  getInputFieldClass = (disabled, error) => {
    if (disabled) return 'form-input__form-control--disabled';
    else if (error) return 'form-input__form-control--error';
    else return 'form-input__form-control';
  };

  render() {
    const {
      type,
      error,
      placeholder,
      disabled,
      label,
      maxLength,
      required,
      icon,
      handleIconClick,
      value,
      onKeyDown,
      subtitle = '',
      rangeText,
      evtReq,
      onPaste,
      units,
      onBlur,
      borderReq,
      //checkDomainError = false,
      redirectSettings,
    } = this.props;
    return (
      <div className="form-input form-input__page-property-block">
        {label && (
          <div className="form-input__label-field">
            {required && (
              <span className="form-input__label-field--mandatory">*</span>
            )}
            {label}
          </div>
        )}
        <div className="form-input__input-field">
          {subtitle && (
            <div className="form-input__input-field--subtitle">
              {subtitle}{rangeText ? <span className="settings-range-text">(Range: {rangeText})</span> : ""}
              {units && <strong>{' ' + units}</strong>}
            </div>
          )}

          <div
            className={`input-field ${icon ? 'icon-space' : ''} ${handleIconClick ? 'icon-link' : ''
              } ${borderReq ? 'top-border' : ''}`}
          >
            <input
              {...this.props}
              placeholder={placeholder}
              type={type}
              className={this.getInputFieldClass(disabled, error)}
              maxLength={maxLength}
              value={value}
              disabled={disabled}
              onChange={this.onChange}
              onKeyDown={evt => {
                if (onKeyDown)
                  evtReq ? onKeyDown(evt) : onKeyDown(evt.keyCode || evt.which);
              }}
              onBlur={evt => onBlur && onBlur(evt)}
              onPaste={evt => onPaste && onPaste(evt)}
            />
            {icon && <img src={icon} onClick={handleIconClick} />}
          </div>
          {error && (
            <span className="error-box-wrap">
              <span className="error-box-message">{error}</span>
              {/* <img className="error-box-icon" src={errorIcon} alt="icon" /> */}
              {/* {checkDomainError && <span className = "hand domain-link-text" onClick={redirectSettings}>Click here for add a domain</span>} */}
            </span>
          )}
        </div>
      </div>
    );
  }
}

export default RenderInput;
