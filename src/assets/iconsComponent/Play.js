import React from 'react';

const Play = ({ fillColor }) => {
  return (
    <svg
      width="36"
      height="36"
      viewBox="0 0 36 36"
      fill="none"
    >
      <g filter="url(#filter0_d)">
        <circle cx="18" cy="17" r="16" fill={fillColor} />
      </g>
      <circle
        cx="18"
        cy="17"
        r="9"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M17.0001 21.29C16.8514 21.4075 16.6491 21.431 16.4776 21.3505C16.306 21.27 16.1947 21.0994 16.1901 20.91L16.0001 17L15.8701 13.19C15.8649 13.0001 15.9657 12.823 16.1317 12.7306C16.2977 12.6381 16.5013 12.6456 16.6601 12.75L22.0701 16.48C22.1999 16.574 22.2768 16.7247 22.2768 16.885C22.2768 17.0453 22.1999 17.196 22.0701 17.29L17.0001 21.29Z"
        fill="white"
      />
      <defs>
        <filter
          id="filter0_d"
          x="0"
          y="0"
          width="36"
          height="36"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dy="1" />
          <feGaussianBlur stdDeviation="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};

export default Play;
