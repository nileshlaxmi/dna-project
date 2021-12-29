import React from 'react';

const BulkUploadIcon = ({
  fillColor = '#71757B',
  width = '30',
  height = '28',
}) => {
  return (
    <svg width={width} height={height} viewBox="0 0 32 32" fill="none">
      <rect
        x="4.6"
        y="1.6"
        width="19.3806"
        height="24.9935"
        rx="1.4"
        stroke={fillColor}
        strokeWidth="1.2"
      />
      <path
        d="M27.387 3.80645V28C27.387 29.1046 26.4916 30 25.387 30H6.8064"
        stroke={fillColor}
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <line
        x1="14.8903"
        y1="8.14839"
        x2="14.8903"
        y2="20.0452"
        stroke={fillColor}
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M11.4839 10.8558L14.4378 7.90194C14.633 7.70668 14.9496 7.70668 15.1449 7.90194L18.0988 10.8558"
        stroke={fillColor}
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default BulkUploadIcon;
