import React, { Component } from 'react';
import './index.scss';
import { isEqual } from 'lodash';
import 'react-rangeslider/lib/index.css';
import { inputTypes } from 'constants/index';
import CheckBox from './FilterTypes/CheckBox';
import SelectInput from './FilterTypes/SelectInput';
import EnhancedSlider from './FilterTypes/EnhancedSlider';
import EnhancedDateRangePicker from './FilterTypes/EnhancedDateRangePicker';
import Input from './FilterTypes/Input';
import Toggler from './FilterTypes/Toggler';
import RadioButtonColumn from './FilterTypes/RadioButtons';
import EnhancedLanguagePicker from './FilterTypes/EnhancedLanguagePicker';
import EnhancedMultiSelect from './FilterTypes/EnhancedMultiSelect';
import FilterAction from './FilterAction';
import FilterHeader from './FilterHeader';
import closeIcon from 'assets/images/close.svg';
import { validateFilter } from 'utils/validations';

const fieldComponents = {
  [inputTypes.checkbox]: CheckBox,
  [inputTypes.select]: SelectInput,
  [inputTypes.dateRangePicker]: EnhancedDateRangePicker,
  [inputTypes.slider]: EnhancedSlider,
  [inputTypes.input]: Input,
  [inputTypes.toggle]: Toggler,
  [inputTypes.radio]: RadioButtonColumn,
  [inputTypes.languagePicker]: EnhancedLanguagePicker,
  [inputTypes.multiSelect]: EnhancedMultiSelect,
};

class FilterOverlayForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filters: props.filters || {},
      isUpdated: false,
      errors: {}
    };
  }

  handleSelectAll = fieldName => {
    let filterArr = [];
    let groups = this.props.fields;
    let values = groups.filter(item => {
      if (item.fieldName === fieldName) {
        return item;
      }
    });
    let finalValues = values[0].group.map(item => {
      if (item.name !== 'all') filterArr.push(item.name);
    });
    return filterArr;
  };

  onChange = (value, fieldName, type, multiSelect, e) => {
    let { domainList = [] } = this.props;
    let filters = { ...this.state.filters };
    if (type === inputTypes.dateRangePicker) {
      filters = { ...filters, ...value };
    } else if (type === inputTypes.checkbox && multiSelect === true) {
      if (value === 'all' && e.target.checked) {
        let filterValue = this.handleSelectAll(fieldName);
        filters[fieldName] = filterValue;
      } else if (filters[fieldName].length == 1 && e.target.checked == false) {
        let filterValue = this.handleSelectAll(fieldName);
        filters[fieldName] = filterValue;
      } else {
        if (filters[fieldName].includes(value)) {
          let index = filters[fieldName].indexOf(value);
          filters[fieldName].splice(index, 1);
        } else {
          filters[fieldName].push(value);
        }
      }
      filters = { ...filters };
    } else if (type == inputTypes.languagePicker && fieldName === 'language') {
      filters[fieldName] = value;
    } else {
      filters[fieldName] = value;
    }
    let isUpdated = !isEqual(filters, this.props.filters);
    let errors = validateFilter(filters, domainList)
    this.setState(
      {
        filters,
        isUpdated,
        errors
      },
      () => {
        if (fieldName === 'customRange') {
          this.props.updateRangeType(value);
        }
      },
    );
  };

  applyFilters = () => {
    const { filters } = this.state;
    let { domainList = [] } = this.props;
    let errors = validateFilter(filters, domainList);
    this.setState({ errors });
    if (!Object.keys(errors).length) {
      this.props.updateFilters(filters);
      this.setState({
        isUpdated: false,
      });
    }
  };

  cancelFilters = () => {
    this.props.showHideFilter();
  };

  clearFilters = () => {
    this.setState(
      {
        filters: this.props.filters,
        isReset: true,
        errors: validateFilter(this.props.filters)
      },
      () => {
        this.setState({
          isReset: false,
          isUpdated: false,
        });
      },
    );
  };

  render() {
    const { fields, getNode } = this.props;
    const { filters, isReset, isUpdated, errors } = this.state;
    return (
      <div id="myNav" className="overlay">
        <div className="grid-filter-container">
          <div className="grid-filter-wrapper">
            <FilterHeader
              src={closeIcon}
              alt="cancel"
              onClick={this.cancelFilters}
            />
            <div className="fields-box">
              {(fields || []).map((field, key) => {
                const InputComponent = fieldComponents[field.type];
                if (!InputComponent) return;
                return (
                  <InputComponent
                    key={`${key}`}
                    {...field}
                    value={
                      field.isForceUpdateValue
                        ? field.value
                        : filters[field.fieldName]
                    }
                    filters={filters}
                    onChange={this.onChange}
                    isReset={isReset}
                    options={field.options}
                    placeholder={field.placeholder}
                    getNode={getNode}
                    errors={errors}
                    uniqueKey={`${key}`}
                  />
                );
              })}
            </div>
            <FilterAction
              filters={fields}
              applyFilters={this.applyFilters}
              cancelFilters={this.cancelFilters}
              clearFilters={this.clearFilters}
              isUpdated={isUpdated}
              errors={errors}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default FilterOverlayForm;
