import React, { Component } from 'react';
import withError from 'utils/errorHoc';
import { connect } from 'react-redux';
import Logo from 'assets/images/TI_logo.svg';
import hideIcon from 'assets/images/hide.svg';
import viewIcon from 'assets/images/view.svg';
import userIcon from 'assets/images/user_login.svg';
import { CONSTANTS } from 'constants/index';
import { withRouter } from 'react-router-dom';
import {
  userSignin,
  clearError,
  signinSuccess,
  oneLoginRedirect,
} from 'store/auth/action';
import Spinner from 'components/shared/spinner';
import './index.scss';
import { defaultValidation, validateForm } from 'utils/validations';
import errorMessages from 'constants/errorMessages';
import { errorToast } from 'components/common/SnackBar';
import RenderInput from 'components/common/elements/renderInput';
import maxLength from 'constants/maxLength';

class SigninContainer extends Component {
  state = {
    username: '',
    password: '',
    errors: {},
  };

  componentDidMount() { }

  handleChange = (name, value) => {
    let _errors = { ...this.state.errors };
    let property = name;
    const validation = defaultValidation[property];
    if (validation) {
      let error = validation({ value });
      if (error) {
        _errors[property] = error;
      } else {
        delete _errors[property];
      }
      this.setState({ errors: { ..._errors } });
    }
    this.setState({ [property]: value });
  };

  submit = e => {
    e.preventDefault();
    const { username, password } = this.state;
    const { dispatch, history } = this.props;

    const loginObj = {};
    loginObj.username = username;
    loginObj.password = password;

    const loginFormErrors = validateForm({ formData: loginObj, formFields: ['username', 'password'] });

    if (Object.keys(loginFormErrors).length > 0) {
      errorToast(errorMessages.emptyFormError);
      document.getElementById(Object.keys(loginFormErrors)[0]).focus();
    } else {
      dispatch(clearError());
      dispatch(userSignin(username, password)).then(res => {
        if (res) {
          dispatch(signinSuccess(res));
          history.push('/');
        }
      });
    }
  };

  onShowPassword = () => {
    this.setState(preState => ({
      showPassword: !preState.showPassword,
    }));
  };

  isDisabled = () => {
    const { username, password, errors } = this.state;
    return !username || !password || Object.keys(errors).length !== 0;
  };

  render() {
    const { username, password, errors, showPassword } = this.state;
    const { authInfo, history } = this.props;
    const _disabled = this.isDisabled();
    return (
      <div className="auth-form">
        <form className="auth-form__inner" onSubmit={this.submit}>
          <div className="auth-form__header">
            <img src={Logo} alt="logo" />
          </div>
          <div className="auth-form__body">
            <div className="auth-form__body--small">{CONSTANTS.login}</div>
            <RenderInput
              label="Email"
              type="text"
              id="username"
              property="username"
              placeholder="Email"
              value={username}
              icon={userIcon}
              maxLength={maxLength.name + 1}
              onChange={({ value }) => {
                this.handleChange('username', value);
              }}
              error={errors && errors['username']}
            />
            <RenderInput
              label="Password"
              type={showPassword ? 'text' : 'password'}
              id="password"
              property="password"
              placeholder="Password"
              value={password}
              icon={showPassword ? viewIcon : hideIcon}
              maxLength={maxLength.name + 1}
              handleIconClick={this.onShowPassword}
              onChange={({ value }) => {
                this.handleChange('password', value);
              }}
              error={errors && errors['password']}
            />
          </div>
          <button
            className="btn btn-lg btn-secondary btn-block mt-5 sign-in-btn"
            type="submit"
            disabled={_disabled}
          >
            {authInfo.isLoading ? <Spinner inline /> : 'SIGN IN'}
          </button>
          {!authInfo.isLoading && authInfo.error && (
            <div className="error">
              {authInfo.error || 'User Name or password are incorrect'}
            </div>
          )}
          {/* <div className="text-center">
            <span
              className="forgot-password c-pointer"
              onClick={() => history.push('/forgot-password')}
            >
              Forgot Password?
            </span>
          </div> */}
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    authInfo: state.auth,
  };
};

const ConnectedSigninContainer = connect(mapStateToProps)(SigninContainer);

export default withError(withRouter(ConnectedSigninContainer));
