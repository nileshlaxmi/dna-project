import React from 'react';
import MultiSelect from 'components/common/MultiSelect';

const EnhancedMultiSelect = ({
  label,
  fieldName,
  options,
  value = [],
  onChange,
  type,
  isSearchable,
  maxToShow = 2,
}) => {
  return (
    <div className="grid-filter enhanced-slider">
      <div className="column-name">{label}</div>
      <MultiSelect
        className="coustom-select capital"
        values={value}
        handleChange={value => onChange(value, fieldName, type)}
        maxToShow={maxToShow}
        options={options}
        isSearchable={isSearchable}
      />
    </div>
  );
};

export default EnhancedMultiSelect;
