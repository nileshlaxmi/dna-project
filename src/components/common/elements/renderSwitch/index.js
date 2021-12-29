import React, { Component } from 'react';
import Switch from 'react-switch';
import './style.scss';

class RenderSwitch extends Component {
  static defaultProps = {
    _key: 'value',
    label: '',
    error: null,
    value: '',
    placeholder: '',
    disabled: false,
  };

  onChange = value => {
    this.props.onChange({ [this.props._key]: value });
  };

  render() {
    const { disabled, label, subtitle, value, rangeText = "" } = this.props;

    return (
      <div className="form-input__block">
        {label && <div className="form-input__label-field">{label}</div>}
        <div className="form-input__input-field">
          {subtitle && (
            <div className="form-input__input-field--subtitle">{subtitle}{rangeText ? <span className="settings-range-text">(Range: {rangeText})</span> : ""}</div>
          )}
          <Switch
            checked={value ? true : false}
            disabled={disabled}
            height={20}
            width={40}
            onChange={this.onChange}
            checkedIcon={false}
            uncheckedIcon={false}
          />
        </div>
      </div>
    );
  }
}

export default RenderSwitch;
