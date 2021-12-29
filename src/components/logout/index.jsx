import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CONSTANTS } from 'constants/index';
import './style.scss';
import withError from 'utils/errorHoc';
import logoutImage from 'assets/images/logout_image.png';

const Logout = ({ logout }) => {
  const { logoutText } = CONSTANTS;

  useEffect(() => {
    logout();
  }, []);

  return (
    <div className="logout">
      <div className="page-body">
        <div className="actions">
          <div className="message">
            {logoutText.label}
          </div>
          <div className="link">
            <Link className="btn-link" to="/">
              {CONSTANTS.sessionLogin}
            </Link>
          </div>
        </div>
        <div className="image-wrapper">
          <img src={logoutImage} alt="img" className="img-fluid" />
        </div>
      </div>
    </div>
  );
};

export default withError(Logout);
