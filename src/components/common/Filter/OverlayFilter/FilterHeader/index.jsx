import React from 'react';
import './index.scss';

const FilterHeader = ({ src, alt, onClick }) => {
  return (
    <div className="filter-heading-container">
      <div className="filter-heading-container__text">
        <span>{'Filter'}</span>
      </div>
      <div className="filter-heading-container__image">
        {/* <img className="hand" src={src} onClick={onClick} alt={alt} /> */}
      </div>
    </div>
  );
};

export default FilterHeader;
