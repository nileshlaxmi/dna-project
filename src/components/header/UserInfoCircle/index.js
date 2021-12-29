import React from 'react';

const UserInfoCircle = ({ initials, profileRef, toggleDropDown }) => {
  return (
    <div
      ref={profileRef}
      className={!toggleDropDown ? `user-profile__circle` : `user-profile__circle hand`}
      onClick={toggleDropDown}
      data-testid="user-info-circle"
    >
      {initials}
    </div>
  );
};

export default UserInfoCircle;
