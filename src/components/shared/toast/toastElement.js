import React from 'react';
import {
  SuccessIcon,
  ErrorIcon,
  WarningIcon,
  InfoIcon,
  CloseIcon,
} from './toastIcons';

const appearances = {
  success: {
    text: 'Success',
    icon: SuccessIcon,
    color: '#36B37E',
  },
  error: {
    text: 'Error',
    icon: ErrorIcon,
    color: '#FF5630',
  },
  warning: {
    text: 'Warning',
    icon: WarningIcon,
    color: '#FFAB00',
  },
  info: {
    text: 'Info',
    icon: InfoIcon,
    color: '#2684FF',
  },
};

function getTranslate(placement) {
  const pos = placement.split('-');
  const relevantPlacement = pos[1] === 'center' ? pos[0] : pos[1];
  const translateMap = {
    right: 'translate3d(120%, 0, 0)',
    left: 'translate3d(-120%, 0, 0)',
    bottom: 'translate3d(0, 120%, 0)',
    top: 'translate3d(0, -120%, 0)',
  };

  return translateMap[relevantPlacement];
}
const toastStates = placement => ({
  entering: { transform: getTranslate(placement) },
  entered: { transform: 'translate3d(0,0,0)' },
  exiting: { transform: getTranslate(placement) },
  exited: { transform: getTranslate(placement) },
});

export const DefaultToast = ({
  appearance = 'info',
  autoDismiss,
  autoDismissTimeout,
  children,
  isRunning,
  onDismiss,
  pauseOnHover,
  placement,
  transitionDuration,
  transitionState,
  onMouseEnter,
  onMouseLeave,
}) => {
  const style = {
    transition: `transform ${transitionDuration}ms cubic-bezier(0.2, 0, 0, 1)`,
    ...toastStates(placement)[transitionState],
  };
  const Icon = appearances[appearance].icon;
  return (
    <div
      className="toast show-toast"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
      style={style}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="toast-header">
        <div>
          <Icon />
        </div>
        <strong
          className="mr-auto ml-2"
          style={{ color: appearances[appearance].color }}
        >
          {appearances[appearance].text}
        </strong>
        <CloseIcon onClick={onDismiss} />
      </div>
      <div className="toast-body text-justify">{children}</div>
      {autoDismiss && autoDismissTimeout && (
        <Progress
          autoDismissTimeout={autoDismissTimeout}
          isRunning={isRunning}
          color={appearances[appearance].color}
        />
      )}
    </div>
  );
};

const Progress = ({ autoDismissTimeout, isRunning, color }) => {
  const style = {
    backgroundColor: color,
    transition: `${autoDismissTimeout}ms all linear`,
    animation: `progress-toast ${autoDismissTimeout}ms ease-in-out forwards`,
    animationPlayState: isRunning ? 'running' : 'paused',
  };
  return <div className="progress" style={style} />;
};
