import React from 'react';
import infoIcon from 'assets/images/info-icon.svg';
import ToolTip from 'components/common/ToolTip';

const InfoIcon = ({ toolTipObj = {} }) => {
  const { id, alt, dataFor, dataTip } = toolTipObj;
  return (
    <>
      <img src={infoIcon} alt={alt} data-for={dataFor} data-tip={dataTip} />
      <ToolTip
        id={id}
        place="right"
        delayHide={200}
        className={'tooltip-text'}
      />
    </>
  );
};

export default InfoIcon;
