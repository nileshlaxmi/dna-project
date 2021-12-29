import React from 'react';
import { CONSTANTS } from 'constants/index';
import notFoundImage from 'assets/images/timon.png';
import withError from 'utils/errorHoc';
import './index.scss';

const AccessDenied = () => {
  const { accessDenied } = CONSTANTS;
  return (
    <div className="access-denied">
      <div className="page-body">
        <div className="message">
          <div className="title">
            {accessDenied.label}
          </div>
          <div className="subtitle">
            {accessDenied.statement}
          </div>
        </div>
        <div className="image-wrapper">
          <img src={notFoundImage} alt="not found" />
        </div>
      </div>
    </div>
  );
};

export default withError(AccessDenied);
