import React from 'react';

const Calendar = ({ fillColor = '#71757B' }) => {
  return (
    <svg
      width="20px"
      height="20px"
      viewBox="0 0 20 20"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>95A48022-29CC-4F35-830B-BF4F5B379149</title>
      <desc>Created with sketchtool.</desc>
      <g
        id="Dashboard"
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
      >
        <g id="00_Assets" transform="translate(-38.000000, -375.000000)">
          <g id="calendar_24" transform="translate(36.000000, 373.000000)">
            <rect id="Rectangle" x="0" y="0" width="20" height="20"></rect>
            <path
              d="M4.49,21.85 C3.19765369,21.85 2.15,20.8023463 2.15,19.51 L2.15,7 C2.16097928,5.71547097 3.20542405,4.67995308 4.49,4.68 L5.73,4.68 L5.73,2.9 C5.69671975,2.61322763 5.83099445,2.33281037 6.07527033,2.17894268 C6.3195462,2.025075 6.6304538,2.025075 6.87472967,2.17894268 C7.11900555,2.33281037 7.25328025,2.61322763 7.22,2.9 L7.22,4.68 L16.78,4.68 L16.78,2.9 C16.7467197,2.61322763 16.8809944,2.33281037 17.1252703,2.17894268 C17.3695462,2.025075 17.6804538,2.025075 17.9247297,2.17894268 C18.1690056,2.33281037 18.3032803,2.61322763 18.27,2.9 L18.27,4.68 L19.51,4.68 C20.7945759,4.67995308 21.8390207,5.71547097 21.85,7 L21.85,19.51 C21.85,20.8023463 20.8023463,21.85 19.51,21.85 L4.49,21.85 Z M3.65,19.51 C3.65540013,19.9716639 4.02833612,20.3445999 4.49,20.35 L19.49,20.35 C19.9516639,20.3445999 20.3245999,19.9716639 20.33,19.51 L20.33,9.21 L3.65,9.21 L3.65,19.51 Z M20.35,7.7 L20.35,7 C20.3445999,6.53833612 19.9716639,6.16540013 19.51,6.16 L4.51,6.16 C4.28456138,6.15733218 4.06729798,6.24433684 3.90601328,6.40187074 C3.74472857,6.55940464 3.65263662,6.77456102 3.65,7 L3.65,7.7 L20.35,7.7 Z"
              id="Shape"
              fill={fillColor}
              fillRule="nonzero"
            ></path>
          </g>
        </g>
      </g>
    </svg>
  );
};

export default Calendar;
