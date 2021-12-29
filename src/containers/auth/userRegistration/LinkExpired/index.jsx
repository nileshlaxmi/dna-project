import React from 'react';
import { CONSTANTS } from 'constants/index';
import notFoundImage from 'assets/images/link_expired.jpg';
import withError from 'utils/errorHoc';
import './index.scss';

const LinkExpired = () => {
  const { linkExpired } = CONSTANTS;
  return (
    <div className="link-expired">
      <div className="page-body">
        <div className="message">
          <div className="title">
            {linkExpired.label}
          </div>
          <div className="subtitle">
            {linkExpired.statement}
          </div>
        </div>
        <div className="image-wrapper">
          <img src={notFoundImage} alt="not found" />
        </div>
      </div>
    </div>
  );
};

export default withError(LinkExpired);
