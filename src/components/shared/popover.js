import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import Overlay from 'react-bootstrap/Overlay';
import Popover from 'react-bootstrap/Popover';

let count = 0;

const PopoverWrapper = ({
  placement = 'auto',
  trigger = 'click',
  rootClose = true,
  popoverTitle = '',
  popoverComponent,
  popoverClassname = '',
  containerRef,
  children,
  forceShow = null,
  target,
  onHide,
}) => {
  const [show, setShow] = useState(false);
  const triggerElementRef = useRef(null);
  const childrenCount = React.Children.count(children);
  let triggerElement = null;
  const triggerElementProps = {};
  useEffect(() => {
    if (forceShow !== null && typeof forceShow === 'boolean') {
      setShow(forceShow);
    }
  }, [forceShow]);
  const popoverProps = {};

  if (childrenCount > 0) {
    triggerElementProps.ref = node => (triggerElementRef.current = node);
    if (trigger === 'click') {
      triggerElementProps.onClick = () => setShow(true);
    }
    if (trigger === 'hover') {
      triggerElementProps.onMouseEnter = () => setShow(true);
      triggerElementProps.onMouseLeave = () => setShow(false);
      popoverProps.onMouseEnter = () => setShow(true);
      popoverProps.onMouseLeave = () => setShow(false);
    }
    triggerElement = React.cloneElement(
      React.Children.only(children),
      triggerElementProps,
    );
  }

  const overlayProps = {
    placement,
    show: triggerElement === null ? true : show,
    rootClose,
    target: target || triggerElementRef.current,
    container: (containerRef && containerRef.current) || document.body,
  };

  if (rootClose) {
    overlayProps.onHide = e => {
      if (!overlayProps.target.contains(e.target)) {
        if (onHide && typeof onHide === 'function') return onHide();
        setShow(false);
      }
    };
    if (forceShow === true) {
      overlayProps.onHide = () => {};
    }
  }

  if (popoverClassname) {
    popoverProps.className = popoverClassname;
  }

  return (
    <>
      {triggerElement}
      <Overlay {...overlayProps} containerPadding={20}>
        <Popover id={`popover-${count++}`} {...popoverProps}>
          {popoverTitle.length > 0 && (
            <Popover.Title>{popoverTitle}</Popover.Title>
          )}
          <Popover.Content>{popoverComponent}</Popover.Content>
        </Popover>
      </Overlay>
    </>
  );
};

PopoverWrapper.propTypes = {
  placement: PropTypes.string,
  trigger: PropTypes.oneOf(['click', 'hover']),
  popoverTitle: PropTypes.string,
  popoverComponent: PropTypes.node.isRequired,
  // containerRef: PropTypes.node,
  // children: PropTypes.element.isRequired,
};

export default PopoverWrapper;
