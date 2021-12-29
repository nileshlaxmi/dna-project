import React from 'react';
import { TransitionGroup } from 'react-transition-group';

const placements = {
  'top-left': { top: 0, left: 0 },
  'top-center': { top: 10, left: '50%', transform: 'translateX(-50%)' },
  'top-right': { top: 0, right: 0 },
  'bottom-left': { bottom: 0, left: 0 },
  'bottom-center': { bottom: 0, left: '50%', transform: 'translateX(-50%)' },
  'bottom-right': { bottom: 0, right: 0 },
};

export const ToastContainer = ({ children, placement = 'top-right' }) => (
  <div
    aria-live="polite"
    aria-atomic="true"
    className="toast-container"
    style={{ ...placements[placement] }}
  >
    <TransitionGroup component={null}>{children}</TransitionGroup>
  </div>
);
