import React, { Component } from 'react';
import Select, { components } from 'react-select';
import './index.css';
import { Hidden } from '@material-ui/core';

class MultiSelect extends Component {
  formatOptionLabel = ({ label = '' }) => {
    let { maxTextLength } = this.props;
    maxTextLength = maxTextLength || 15;
    return (
      <div
        data-testid="multi-select-option"
        style={{ width: '100%' }}
        title={label}
      >
        {label.length > maxTextLength
          ? label.substr(0, maxTextLength) + '...'
          : label}
      </div>
    );
  };

  render() {
    const {
      values,
      handleChange,
      maxToShow,
      options,
      className,
      isSearchable,
    } = this.props;
    return (
      <div className="multiselect-react" data-testid="multi-select-dropdown">
        <Select
          data-testid="multi-select"
          className={`${className} multi-select`}
          hideSelectedOptions={false}
          isMulti
          options={options}
          formatOptionLabel={this.formatOptionLabel}
          onChange={handleChange}
          value={values}
          maxToShow={maxToShow}
          isSearchable={isSearchable}
          components={{ ValueContainer }}
        />
      </div>
    );
  }
}

export default MultiSelect;

const ValueContainer = ({ children, getValue, ...props }) => {
  let maxToShow = props.selectProps.maxToShow;
  var length = getValue().length;
  let displayChips = React.Children.toArray(children).slice(0, maxToShow);
  let hiddenLanguages = '';
  if (
    props.selectProps.value &&
    props.selectProps.value.length &&
    props.selectProps.value[0].label
  ) {
    for (let i = maxToShow; i < props.selectProps.value.length; i++) {
      if (i == props.selectProps.value.length - 1) {
        hiddenLanguages += props.selectProps.value[i].label;
      } else {
        hiddenLanguages += props.selectProps.value[i].label + ', ';
      }
    }
  }
  return (
    <components.ValueContainer {...props}>
      {!props.selectProps.inputValue && displayChips}
      {length > maxToShow && (
        <div className="more" title={hiddenLanguages}>
          ...
        </div>
      )}
      {length > 0 && <div className="root">{`${length}`}</div>}
    </components.ValueContainer>
  );
};
