import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import { ToastController } from './toastController';
import { ToastContainer } from './toastContainer';
import { DefaultToast } from './toastElement';
import './style.css';

const defaultComponents = { Toast: DefaultToast, ToastContainer };
export let ToastManager = {};

let toastId = 0;

const NOOP = () => {};

export default class ToastPortal extends Component {
  components = {};
  static defaultProps = {
    autoDismissTimeout: 4000,
    components: defaultComponents,
    placement: 'top-center',
    transitionDuration: 220,
    ToastConfigDefault: {
      appearance: 'info',
      autoDismiss: true,
      pauseOnHover: true,
    },
  };
  constructor(props) {
    super(props);
    this.cacheComponents(props.components);
    this.state = { toasts: [] };
    const expose = {};
    Object.defineProperties(expose, {
      add: {
        value: this.add,
        writable: false,
        configurable: false,
        enumerable: false,
      },
      remove: {
        value: this.remove,
        writable: false,
        configurable: false,
        enumerable: false,
      },
    });
    // Object.freeze(ToastManager);
    ToastManager = expose;
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.components !== this.props.components) {
      this.cacheComponents(nextProps.components);
    }
  }
  cacheComponents = components => {
    this.components = {
      ...defaultComponents,
      ...components,
    };
  };

  add = (content, options = {}, cb = NOOP) => {
    const id = ++toastId;
    const { ToastConfigDefault } = this.props;
    const callback = () => cb(id);
    this.setState(state => {
      const toasts = state.toasts.slice(0);
      const toast = Object.assign(
        {},
        { content, id },
        ToastConfigDefault,
        options,
      );
      toasts.push(toast);
      return { toasts };
    }, callback);
  };
  remove = (id, cb = NOOP) => {
    const callback = () => cb(id);
    this.setState(state => {
      const toasts = state.toasts.filter(t => t.id !== id);
      return { toasts };
    }, callback);
  };

  onDismiss = (id, cb = NOOP) => () => {
    cb(id);
    this.remove(id);
  };

  render() {
    const { children, components, ...props } = this.props;
    const { Toast, ToastContainer } = this.components;
    const { toasts } = this.state;
    return createPortal(
      <ToastContainer {...props}>
        {toasts
          .sort((a, b) => b.id - a.id) // newest toast on top
          .map(({ content, id, onDismiss, ...rest }) => (
            <ToastController
              key={id}
              Toast={Toast}
              onDismiss={this.onDismiss(id, onDismiss)}
              {...props}
              {...rest}
            >
              {content}
            </ToastController>
          ))}
      </ToastContainer>,
      document.body,
    );
  }
}
