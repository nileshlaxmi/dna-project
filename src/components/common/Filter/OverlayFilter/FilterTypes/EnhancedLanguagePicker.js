import React from 'react';
import MultiSelect from 'components/common/MultiSelect';

const EnhancedLanguagePicker = ({
  label,
  fieldName,
  group,
  value = [],
  multiSelect,
  onChange,
  type,
  handleLang,
}) => {
  return (
    <div className="grid-filter enhanced-slider">
      <div className="column-name">{label}</div>
      <MultiSelect
        className="coustom-select capital"
        values={value}
        handleChange={value => onChange(value, fieldName, type)}
        maxToShow={2}
        isSearchable={false}
        options={group}
      />
    </div>
  );
};

export default EnhancedLanguagePicker;
