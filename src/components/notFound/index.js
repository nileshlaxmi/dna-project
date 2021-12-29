import React from 'react';
import { Link } from 'react-router-dom';
import { CONSTANTS } from 'constants/index';
import notFoundImage from 'assets/images/timon.png';
import withError from 'utils/errorHoc';
import './index.scss';

const Notfound = () => {
  const { notFoundLabel } = CONSTANTS;
  return (
    <div className="session-timeout not-found">
      <div className="session-timeout__text-box">
        <div className="session-timeout__text-box--text">
          <div className="session-timeout__text-box--text--title">
            {notFoundLabel.hiThere}
          </div>
          <div className="session-timeout__text-box--text--subtitle1">
            {notFoundLabel.somethingWentWrong}
          </div>
          <div className="session-timeout__text-box--text--subtitle2">
            {notFoundLabel.pageNotFound}
          </div>
        </div>
        <div className="session-timeout__text-box--link">
          <Link className="session-timeout__text-box--link--btn" to="/">
            {notFoundLabel.goBack}
          </Link>
        </div>
      </div>
      <div className="session-timeout__img-box">
        <img src={notFoundImage} alt="not found" />
      </div>
    </div>
  );
};

export default withError(Notfound);
