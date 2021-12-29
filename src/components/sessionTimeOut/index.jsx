import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CONSTANTS } from 'constants/index';
import './style.scss';
import sessionTimeout from 'assets/images/sessionTimeout.svg';
import withError from 'utils/errorHoc';

const SessionTimeout = ({ logout }) => {
  useEffect(() => {
    logout();
  }, []);

  return (
    <div className="session-timeout-page">
      <div className="session-timeout">
        <div className="session-timeout__text-box">
          <div className="session-timeout__text-box--text">
            <div className="session-timeout__text-box--text--title">
              {CONSTANTS.sessionWhere}
            </div>
            <div className="session-timeout__text-box--text--subtitle1">
              {CONSTANTS.sessionTimedOut}
            </div>
            <div className="session-timeout__text-box--text--subtitle2">
              {CONSTANTS.sessionWorry}
            </div>
          </div>
          <div className="session-timeout__text-box--link">
            <Link className="session-timeout__text-box--link--btn" to="/">
              {CONSTANTS.sessionLogin}
            </Link>
          </div>
        </div>
        <div className="session-timeout__img-box">
          <img src={sessionTimeout} alt="timeout" />
        </div>
      </div>
    </div>
  );
};

export default withError(SessionTimeout);
