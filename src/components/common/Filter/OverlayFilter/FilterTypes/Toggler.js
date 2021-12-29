import React from 'react';
import Switch from 'react-switch';
import '../index.scss';

const Toggler = ({
  fieldName,
  value = false,
  label,
  subheading,
  type,
  onChange,
}) => {
  return (
    <div className="grid-filter">
      <div data-testid="label-filter-toggle" className="column-name">
        {label}
        <span className="filter-subheading">{subheading}</span>
      </div>
      <div data-testid="swich-filter-toggle" className="custom-labels">
        <Switch
          onChange={checked => onChange(checked, fieldName, type)}
          checked={value}
          uncheckedIcon={false}
          checkedIcon={false}
          height={20}
          width={38}
        />
      </div>
    </div>
  );
};

export default Toggler;
