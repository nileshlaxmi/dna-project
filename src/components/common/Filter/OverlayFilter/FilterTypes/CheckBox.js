import React from 'react';
import '../index.scss';

import Checkbox from '@material-ui/core/Checkbox';

const CheckBox = ({
  label,
  name,
  checked,
  fieldName,
  onChange,
  type,
  multiSelect,
  group,
  value,
}) => {
  let selectAll = false;
  if (label === 'All' && value.length === group.length - 1) {
    selectAll = true;
  }
  return (
    <div className="checkbox-root check-box" key={'check'}>
      <Checkbox
        className="checkbox-container"
        data-testid="checkbox-group-opt"
        onChange={
          selectAll
            ? null
            : e => onChange(e.target.value, fieldName, type, multiSelect, e)
        }
        checked={label === 'All' ? selectAll : checked}
        value={name}
        name={name}
      />
      <span className="checkbox-label">{label}</span>
    </div>
  );
};

const CheckBoxColumn = ({
  label,
  fieldName,
  group,
  value,
  multiSelect,
  onChange,
  type,
}) => {
  return (
    <div className="grid-filter">
      <div data-testid="checkbox-group" className="column-name">
        {label}
      </div>
      {(group || []).map((opt, key) => {
        return (
          <CheckBox
            key={`${key}`}
            {...opt}
            fieldName={fieldName}
            checked={value.includes(opt.name)}
            onChange={onChange}
            type={type}
            multiSelect={multiSelect}
            group={group}
            value={value}
          />
        );
      })}
    </div>
  );
};
export default CheckBoxColumn;
