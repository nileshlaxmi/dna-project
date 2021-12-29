import React from 'react';
import SingleSelect from 'components/common/SingleSelect';
import '../index.scss';

const SelectInput = props => {
  const {
    label,
    type,
    value,
    fieldName,
    placeholder,
    options = [],
    onChange,
    isDisabled,
    getNode,
    uniqueKey,
  } = props;
  const selectedValue =
    typeof value === 'string'
      ? options.find(opt => opt.value === value)
      : value;
  return (
    <div className="grid-filter ">
      <div data-testid="select-label" className="column-name">
        {label}
      </div>
      <div className="dropdown d-inline-block mr-2 coustom-select select-input-wrapper">
        <SingleSelect
          placeholder={placeholder}
          selectedOption={selectedValue}
          options={options}
          onDropdownChange={option =>
            onChange(
              fieldName === 'category' ? option : option.value,
              fieldName,
              type,
            )
          }
          search={true}
          disabled={isDisabled || false}
          getNode={getNode}
          uniqueKey={uniqueKey}
        />
      </div>
    </div>
  );
};

export default SelectInput;
