import React from 'react';
import './style.scss';
import { sortingIconObj } from 'constants/noiseDetection';

const SortingIcon = ({ type, onClick }) => {
  const getImageName = () => (type ? 'asc' : 'desc');
  const imageName = getImageName();

  return (
    <div className="sorting-icon hand" onClick={onClick}>
      <img src={sortingIconObj[imageName]} alt={type ? 'asc' : 'desc'} />
    </div>
  );
};

export default SortingIcon;
