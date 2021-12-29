import React, { useRef, useState } from 'react';
import Popup from 'reactjs-popup';
import menuIcon from 'assets/images/triple-dots.svg';
import './style.scss';

const MenuOptions = ({ children, onIconClick }) => {
  const [position, setPosition] = useState('right center');
  const ref = useRef();
  const menuRef = useRef();
  const handleActionClick = e => {
    ref.current.closePopup();
    onIconClick(e);
  };

  const onMenuClick = () => {
    if (menuRef.current) {
      let menuRect = menuRef.current.getBoundingClientRect();
      let menuDiff = window.screen.availWidth - menuRect.right;
      if (menuDiff < 50) {
        setPosition('left center');
      }
    }
  };
  return (
    <div className="menu-options hand" ref={menuRef} onClick={onMenuClick}>
      <Popup
        ref={ref}
        trigger={<img src={menuIcon} alt="menu" />}
        position={position}
        closeOnDocumentClick
      >
        {React.cloneElement(children, {
          onIconClick: handleActionClick,
        })}
      </Popup>
    </div>
  );
};

export default MenuOptions;
