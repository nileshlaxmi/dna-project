import React from 'react';
import Slider from 'react-rangeslider';
import 'react-rangeslider/lib/index.css';
import './index.scss';

const EnhancedSlider = ({
  value,
  label,
  subtitle,
  sliderLabels,
  orientation,
  onChange,
  min,
  max,
  step,
  format,
  isLabelReq,
  disabled,
}) => {
  return (
    <div className="form-input__block">
      {label && <div className="form-input__label-field">{label}</div>}
      <div className="form-input__input-field">
        {subtitle && (
          <div className="form-input__input-field--subtitle">{subtitle}</div>
        )}
        <div className={disabled ? 'slider-disabled':''}>
        <Slider
          min={min}
          max={max}
          value={value}
          step={step}
          format={format}
          orientation={orientation}
          handleLabel={isLabelReq ? value : ''}
          labels={sliderLabels}
          tooltip={false}
          onChange={value => !disabled ? onChange(value) : null}
        />
        </div>
      </div>
    </div>
  );
};

export default EnhancedSlider;
