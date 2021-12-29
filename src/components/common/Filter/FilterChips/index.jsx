import React, { Component } from 'react';
import moment from 'moment';
import closeIcon from 'assets/images/close.svg';
import revertIcon from 'assets/images/revert.svg';
import { isEqual } from 'lodash';
import './index.scss';

const Chip = ({ item, type, removeFilter, isRemoveEnabled, isRevert }) => {
  let icon = isRevert ? (
    <img
      src={revertIcon}
      onClick={() => removeFilter(type)}
      className="chip-icon"
    />
  ) : (
    <img
      src={closeIcon}
      onClick={() => removeFilter(type)}
      className="chip-icon"
    />
  );
  return (
    <div className="tag-item" key={item} title={item}>
      <span className="chip-text">{item}</span>
      {isRemoveEnabled && <span>{icon}</span>}
    </div>
  );
};

class FilterChips extends Component {
  removeFilter = (type) => {
    const { updateFilters, removedFilters, filters } = this.props;
    let updatedFilters = { ...filters };
    if (type === "date") {
      updatedFilters.startDate = removedFilters.startDate;
      updatedFilters.endDate = removedFilters.endDate;
    } else {
      updatedFilters[type] = removedFilters[type];
    }
    updateFilters(updatedFilters);
  };
  render() {
    const { filters = {}, removedFilters } = this.props;
    return (
      <div className="filter-chips">
        {filters && Object.keys(filters).length > 0 && (
          <div className="chips-container">
            {Object.keys(filters).map((key) => {
              if (
                key === "startDate" &&
                filters["startDate"] &&
                filters["endDate"]
              ) {
                let selectedRange = `${moment(filters["startDate"]).format(
                  "DD/MM/YYYY"
                )} - ${moment(filters["endDate"]).format("DD/MM/YYYY")}`;
                return (
                  <Chip
                    type="date"
                    item={selectedRange}
                    removeFilter={this.removeFilter}
                    isRemoveEnabled={
                      !isEqual(
                        moment.isMoment(filters["startDate"]) && filters["startDate"].clone().startOf('day'),
                        moment.isMoment(removedFilters["startDate"]) && removedFilters["startDate"].clone().startOf('day')
                      ) ||
                      (!isEqual(
                        moment.isMoment(filters["endDate"]) &&  filters["endDate"].clone().startOf('day'), 
                        moment.isMoment(removedFilters["endDate"]) &&  removedFilters["endDate"].clone().startOf('day')
                      ))
                    }
                    isRevert={
                      removedFilters["startDate"] && removedFilters["endDate"]
                    }
                  />
                );
              }
              if (filters[key] && key !== "endDate") {
                return (
                  <Chip
                    type={key}
                    item={filters[key]}
                    removeFilter={this.removeFilter}
                    isRemoveEnabled={
                      !isEqual(filters[key], removedFilters[key])
                    }
                    isRevert={removedFilters[key]}
                  />
                );
              }
            })}
          </div>
        )}
      </div>
    );
  }
}

export default FilterChips;
