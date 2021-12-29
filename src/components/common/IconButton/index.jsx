import React from 'react';
import './index.scss';

const IconButton = ({ src, alt, onClick, disabled = false }) => {
  return (
    <div className={`filter-icon hand ${disabled ? 'disabled' : ''}`} onClick={onClick}>
      <img src={src} alt={alt} />
    </div>
  );
};

export default IconButton;
