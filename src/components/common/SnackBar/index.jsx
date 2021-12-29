import React, { Component } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

let openSnackbarFn = () => {};
class SnackbarToast extends Component {
  state = {
    open: false,
    message: '',
  };

  handleClose = (e, result) => {
    if (result === 'clickaway') return;
    this.setState({
      open: false,
      message: '',
    });
  };

  componentDidMount() {
    openSnackbarFn = this.openSnackbar;
  }

  openSnackbar = (message, severity) => {
    this.setState({
      open: true,
      message: message,
      severity: severity,
    });
  };

  render() {
    const { open, message, severity } = this.state;

    return (
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={open}
        onClose={(e, result) => this.handleClose(e, result)}
        autoHideDuration={2000}
      >
        <MuiAlert
          icon={false}
          data-testid="mui-alert-info"
          onClose={this.handleClose}
          severity={severity}
          elevation={6}
          variant="filled"
        >
          {message}
        </MuiAlert>
      </Snackbar>
    );
  }
}

export function successToast(message) {
  if (message !== undefined && message !== '')
    openSnackbarFn(message, 'success');
}
export function errorToast(message) {
  if (message !== undefined && message !== '') openSnackbarFn(message, 'error');
}
export function warningToast(message) {
  if (message !== undefined && message !== '')
    openSnackbarFn(message, 'warning');
}
export default SnackbarToast;
