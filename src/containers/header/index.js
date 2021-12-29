import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import './index.scss';
import { withRouter } from 'react-router-dom';
import TI_Logo from 'assets/images/telus-logo.svg';
import Mobile_Logo from 'assets/images/mobile-logo.svg';
import UserProfile from './UserProfile';

const Header = ({
  authInfo,
  history,
  logout
}) => {
  return (
    <div id="top-header" className="top-header header">
      <div className="logo-div">
        <div className="logo-wrapper" onClick={() => history.push('/')}>
          <img alt="logo" src={TI_Logo} className="logo-img" />
          <img alt="logo" src={Mobile_Logo} className="mobile-logo-img" />
        </div>
        {/* <div className="logo-div--text">
          <span>{CONSTANTS.fdText}</span>
        </div> */}
      </div>
      <div className="right-section">
        <UserProfile
          authInfo={authInfo}
          history={history}
          logout={logout}
        />
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
  };
};

const mapDispatchToProps = {
};

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
)(Header);
