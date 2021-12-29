import React from 'react';

const ShiftIcon = ({
  fillColor = '#71757B',
}) => {
  return (
    <svg width="30" height="28" viewBox="9 9 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect opacity="0.2" width="48" height="48" rx="4" fill="none" />
      <path fillRule="evenodd" clipRule="evenodd" d="M29.11 29.76C32.1934 29.7627 34.8351 31.9669 35.39 35L36.28 39.8C36.3097 39.9605 36.2665 40.1259 36.1622 40.2515C36.0579 40.377 35.9032 40.4498 35.74 40.45H12.26C12.0968 40.4498 11.9421 40.377 11.8378 40.2515C11.7335 40.1259 11.6903 39.9605 11.72 39.8L12.61 35C13.1649 31.9669 15.8066 29.7627 18.89 29.76H29.11ZM12.92 39.35H24H35.08L34.31 35.17C33.8471 32.6618 31.6605 30.8411 29.11 30.84H18.89C16.3395 30.8411 14.1528 32.6618 13.69 35.17L12.92 39.35Z" fill={fillColor} />
      <circle cx="24.0001" cy="18.64" r="9.19" stroke={fillColor} strokeLinecap="round" />
      <path d="M23.6899 12.59V18.37" stroke={fillColor} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M29.0999 19.64L23.6899 18.37" stroke={fillColor} strokeLinecap="round" strokeLinejoin="round" />
    </svg>

  );
};

export default ShiftIcon;
