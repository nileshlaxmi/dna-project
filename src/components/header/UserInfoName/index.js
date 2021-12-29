import React from 'react';
import moment from 'moment';
import { isMobile } from 'utils/responsive';
import caretDownIcon from 'assets/images/down-arrow.svg';

const UserInfoName = ({ name, lastLogin, toggleDropDown, profileRef }) => {
  let _lastLogin = moment(lastLogin).format('DD-MMM-YYYY, hh:mm A');
  return (
    <div className="user-profile__name">
      <div className="user-profile__name-wrapper">
        <div className="user-profile__name--text">{name}</div>
        {!isMobile() && (
          <div
            ref={profileRef}
            className="user-profile__name--img"
            onClick={toggleDropDown}
          >
            <img src={caretDownIcon} alt="arrow" />
          </div>
        )}
      </div>
      <div className="user-profile__name--last-login">
        <span className="last-login-heading">Last Login:</span>
        <span className="last-login-date">{` ${_lastLogin}`}</span>
      </div>
    </div>
  );
};

export default UserInfoName;
