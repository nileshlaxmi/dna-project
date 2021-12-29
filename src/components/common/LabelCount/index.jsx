import React from 'react';
import InfoIcon from 'components/common/InfoIcon';
import withError from 'utils/errorHoc';
import './style.scss';

const LabelCount = ({ index, title, count, toolTipObj = {}, isDisabled }) => {
  return (
    <div
      className={isDisabled ? 'label-count disabled' : 'label-count'}
      key={index}
    >
      <div className="label-count__title">
        <div className="label-count__title--text">
          <span>{title}</span>
        </div>
        {toolTipObj.dataTip && <InfoIcon toolTipObj={toolTipObj} />}
      </div>

      <div className="label-count__count">
        <span>{isDisabled ? 'NA' : count}</span>
      </div>
    </div>
  );
};

export default withError(LabelCount);
