import React, { useState, useEffect } from 'react';
import UserInfoCircle from 'components/header/UserInfoCircle';
import UserInfoName from 'components/header/UserInfoName';
import UserInfoDropDown from 'components/header/UserInfoDropDown';
import ChangePassword from 'containers/auth/changePassword';
import { getInitials } from 'utils';
import { useComponentVisible } from 'utils/customHooks';

const UserProfile = ({ authInfo, history, logout }) => {
  const [changePassword, setChangePassword] = useState(false);
  const {
    popupRef,
    profileRef,
    isComponentVisible,
    setIsComponentVisible,
  } = useComponentVisible(false);
  const { user = {} } = authInfo;
  const { name = '', email = '', emp_id = '', last_login = '', manager, manager_filter } = user;
  const modalHandler = data => {
    if (data.action === 'hide') {
      setChangePassword(false);
    }
  };
  const openChangePasswordBox = () => {
    setChangePassword(true);
    setIsComponentVisible(false);
  };
  const toggleDropDown = () => setIsComponentVisible(!isComponentVisible);
  const handleLogout = () => {
    // history.push('/logout');
    logout()
  };
  const initials = getInitials(name);
  return (
    <div className="user-profile">
      <UserInfoCircle
        initials={initials}
        toggleDropDown={toggleDropDown}
        profileRef={profileRef}
      />
      <UserInfoName
        name={name}
        lastLogin={last_login}
        toggleDropDown={toggleDropDown}
        profileRef={profileRef}
      />
      {isComponentVisible && (
        <UserInfoDropDown
          popupRef={popupRef}
          logout={handleLogout}
          openChangePasswordBox={openChangePasswordBox}
          toggleDropDown={toggleDropDown}
          initials={initials}
          {...user}
        />
      )}
      {changePassword && <ChangePassword handler={modalHandler} />}
    </div>
  );
};

export default UserProfile;
