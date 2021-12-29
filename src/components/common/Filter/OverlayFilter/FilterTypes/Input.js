import React from 'react';
import searchIcon from 'assets/images/search.svg';
import '../index.scss';
import RenderInput from 'components/common/elements/renderInput';

const Input = ({
  fieldName,
  value,
  label,
  subheading,
  type,
  onChange,
  placeholder,
  errors,
  isSearchIcon,
}) => {
  return (
    <div className="grid-filter input-filter">
      <div data-testid="label-filter-input" className="column-name">
        {label}
        <span className="filter-subheading">{subheading}</span>
      </div>
      <div data-testid="input-filter-wrapper" className="custom-labels">
        {/* <img alt="Search" title="Search" width="20" src={searchIcon} /> */}
        <RenderInput
          // label="Emp Name"
          type="text"
          name={fieldName}
          // required={true}
          value={value}
          placeholder={placeholder}
          onChange={({ value }) => { onChange && onChange(value, fieldName, type) }}
          error={errors && errors[fieldName]}
        />
      </div>
    </div>
  );
};

export default Input;
