import React from 'react';
import '../index.scss';

const RadioButton = ({ label, name, checked, fieldName, onChange, type }) => {
  return (
    <div className="checkbox-root check-box" key={'check'}>
      <label className="custom-radio d-inline-block">
        <input
          data-testid="radio-group-opt"
          type="radio"
          name={name}
          className=""
          value={name}
          onChange={e => onChange(e.target.value, fieldName, type)}
          checked={checked}
        />
        <span className="custom-radio-btn"></span>
      </label>
      <span>{label}</span>
    </div>
  );
};

const RadioButtonColumn = ({
  label,
  fieldName,
  group,
  value,
  multiSelect,
  onChange,
  type,
}) => {
  return (
    <div className="grid-filter ">
      <div data-testid="radio-group" className="column-name">
        {label}
      </div>
      {(group || []).map((opt, key) => {
        return (
          <RadioButton
            key={`${key}`}
            {...opt}
            fieldName={fieldName}
            checked={value === opt.name}
            onChange={onChange}
            type={type}
          />
        );
      })}
    </div>
  );
};
export default RadioButtonColumn;
