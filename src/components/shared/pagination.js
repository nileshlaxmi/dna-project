import React from 'react';
import PaginationBt from 'react-bootstrap/Pagination';
const itemStyle = {};

const Pagination = ({ onPaginationClick, isNext, isPrev, className }) => (
  <PaginationBt className={className}>
    <PaginationBt.Item
      style={itemStyle}
      disabled={!isPrev}
      onClick={() => onPaginationClick('prev')}
    >{`< Prev`}</PaginationBt.Item>
    <PaginationBt.Item
      style={itemStyle}
      disabled={!isNext}
      onClick={() => onPaginationClick('next')}
    >{`Next >`}</PaginationBt.Item>
  </PaginationBt>
);

export default Pagination;
