import React from 'react';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

const TooltipWrapper = ({ placement = 'top', text = '', ...rest }) => (
  <OverlayTrigger
    placement={placement}
    overlay={<Tooltip>{text}</Tooltip>}
    {...rest}
  />
);

export default TooltipWrapper;
