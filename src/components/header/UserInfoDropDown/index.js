import React from 'react';
import { CONSTANTS } from 'constants/index';
import UserInfoCircle from '../UserInfoCircle';
import moment from 'moment';
import ToolTip from 'components/common/ToolTip';
import { isMobile } from 'utils/responsive';

const UserInfoDropDown = ({
  name,
  emp_id,
  email,
  initials,
  logout,
  popupRef,
  last_login,
}) => {
  let _lastLogin = moment(last_login).format('DD-MMM-YYYY, hh:mm A');
  return (
    <div ref={popupRef}>
      <div className="user-profile__dropdown">
        <div className="user-profile__dropdown--large">
          <div className="user-profile__dropdown--large--name-id-block">
            <UserInfoCircle initials={initials} />
            <div className="user-profile__dropdown--large--name" title={name}>
              <span>{name}</span>
              <span title={emp_id}>({emp_id})</span>
            </div>
          </div>

          <div className="user-profile__dropdown--large--email" data-event={isMobile() ? 'click' : ""} data-tip={email} data-for={`email-tooltip`}>
            {email}
          </div>
          <ToolTip
            id={`email-tooltip`}
            place="top"
            delayHide={200}
            className={'tooltip-text'}
          />
          <div className="user-profile__dropdown--large--last-login">
            <span className="last-login-heading">Last Login:</span>
            <span className="last-login-date" title={` ${_lastLogin}`}>{` ${_lastLogin}`}</span>
          </div>
        </div>
        <div className="user-profile__dropdown--small">
          <div className="menu-item hand">
            <div onClick={logout}>{CONSTANTS.logoutTxt}</div>
          </div>
        </div>
      </div>
      <div className="user-profile__triangle"></div>
    </div>
  );
};

export default UserInfoDropDown;
