import React from 'react';
import NoData from 'assets/images/NoData.svg';
import './index.scss';

function NoDataComp({ msgHeading, msgSubtitle }) {
  return (
    <div className="noDatacomp">
      <div className="noDataImg">
        <img src={NoData} alt="" className="noDataImg"></img>
      </div>

      <div className="noDataHeading">{msgHeading || ''}</div>

      <div className="noDataSubHeading ">{msgSubtitle || ''}</div>
    </div>
  );
}

export default NoDataComp;
