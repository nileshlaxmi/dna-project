import React, { useState, useEffect, useRef } from 'react';

export const useComponentVisible = initialIsVisible => {
  const [isComponentVisible, setIsComponentVisible] = useState(
    initialIsVisible,
  );
  const popupRef = React.createRef();
  const profileRef = React.createRef();

  const handleClickOutside = event => {
    if (
      popupRef.current
      && profileRef.current
      && !popupRef.current.contains(event.target)
      && !profileRef.current.contains(event.target)
    ) {
      setIsComponentVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  });

  return { popupRef, profileRef, isComponentVisible, setIsComponentVisible };
};
