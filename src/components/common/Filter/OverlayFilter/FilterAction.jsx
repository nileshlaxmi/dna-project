import React from 'react';
import RenderBtn from 'components/common/elements/renderBtn';
import './index.scss';

export const CLEAR = 'CLEAR';
export const CANCEL = 'CANCEL';
export const APPLY = 'APPLY';

const FilterAction = ({
  applyFilters,
  clearFilters,
  cancelFilters,
  isUpdated,
  errors
}) => {
  return (
    <div className="filter-footer-container">
      <div className="filter-action-container">
        <RenderBtn
          type="submit"
          label="APPLY"
          disabled={!isUpdated || !!Object.keys(errors).length}
          onClick={() => applyFilters && applyFilters(APPLY)}
        />
        <RenderBtn
          type="cancel"
          label="RESET"
          disabled={!isUpdated}
          onClick={() => clearFilters && clearFilters(CLEAR)}
        />
        <RenderBtn
          type="cancel"
          label="CANCEL"
          // disabled={!isUpdated}
          onClick={() => cancelFilters && cancelFilters(CANCEL)}
        />
      </div>
    </div>
  );
};

export default FilterAction;
