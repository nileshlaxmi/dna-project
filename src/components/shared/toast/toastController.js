import React, { Component } from 'react';
import { Transition } from 'react-transition-group';

export class ToastController extends Component {
  timeout;
  state = {
    autoDismissTimeout: this.props.autoDismissTimeout,
    isRunning: this.props.autoDismiss,
  };
  static defaultProps = {
    autoDismiss: false,
  };
  static getDerivedStateFromProps({ autoDismiss, autoDismissTimeout }) {
    if (!autoDismiss) return null;
    const timeout =
      typeof autoDismiss === 'number' ? autoDismiss : autoDismissTimeout;

    return { autoDismissTimeout: timeout };
  }

  componentDidMount() {
    this.startTimer();
  }
  componentWillUnmount() {
    this.clearTimer();
  }
  startTimer = () => {
    const { autoDismiss, onDismiss } = this.props;
    const { autoDismissTimeout } = this.state;

    if (!autoDismiss) return;

    this.setState({ isRunning: true });
    this.timeout = new Timer(onDismiss, autoDismissTimeout);
  };
  clearTimer = () => {
    if (!this.props.autoDismiss) return;
    if (this.timeout) this.timeout.clear();
  };
  onMouseEnter = () => {
    this.setState({ isRunning: false }, () => {
      if (this.timeout) this.timeout.pause();
    });
  };
  onMouseLeave = () => {
    this.setState({ isRunning: true }, () => {
      if (this.timeout) this.timeout.resume();
    });
  };

  render() {
    const { Toast, ...props } = this.props;
    const { autoDismissTimeout, isRunning } = this.state;
    const time = props.transitionDuration;
    const hasMouseEvents = props.pauseOnHover && props.autoDismiss;
    const handleMouseEnter = hasMouseEvents ? this.onMouseEnter : null;
    const handleMouseLeave = hasMouseEvents ? this.onMouseLeave : null;
    return (
      <Transition appear mountOnEnter unmountOnExit timeout={time} {...props}>
        {transitionState => (
          <Toast
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            autoDismissTimeout={autoDismissTimeout}
            isRunning={isRunning}
            transitionState={transitionState}
            {...props}
          />
        )}
      </Transition>
    );
  }
}

function Timer(callback, delay) {
  let timerId = delay;
  let start = delay;
  let remaining = delay;

  this.clear = function() {
    clearTimeout(timerId);
  };

  this.pause = function() {
    clearTimeout(timerId);
    remaining -= Date.now() - start;
  };

  this.resume = function() {
    start = Date.now();
    clearTimeout(timerId);
    timerId = setTimeout(callback, remaining);
  };

  this.resume();
}
