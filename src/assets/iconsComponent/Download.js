import React from 'react';

const Download = ({ fillColor }) => {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M22 15.5V20.3276C22 21.0894 21.3825 21.7069 20.6207 21.7069H3.37931H3.37931C2.61754 21.7069 2 21.0894 2 20.3276V15.5"
        stroke={fillColor}
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 3V16.7931"
        stroke={fillColor}
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.51721 12.6552L12 16.7931L16.4827 12.6552"
        stroke={fillColor}
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Download;
