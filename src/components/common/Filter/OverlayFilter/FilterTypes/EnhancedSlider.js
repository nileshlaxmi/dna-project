import React from 'react';
import Slider from 'react-rangeslider';
import '../index.scss';

const EnhancedSlider = ({
  fieldName,
  value,
  label,
  subheading,
  sliderLabels,
  orientation,
  type,
  onChange,
}) => {
  return (
    <div className="grid-filter enhanced-slider">
      <div data-testid="label-filter-slider" className="column-name">
        {label}
        <span className="filter-subheading">{subheading}</span>
      </div>
      <div
        data-testid="wrapper-filter-slider"
        className="custom-labels custom-slider"
      >
        <Slider
          value={value}
          orientation={orientation}
          handleLabel={`${value || 0}`}
          labels={sliderLabels}
          onChange={value => {
            onChange(value, fieldName, type);
          }}
        />
      </div>
    </div>
  );
};

export default EnhancedSlider;
