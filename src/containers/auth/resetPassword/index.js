import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { defaultValidation, validateForm } from 'utils/validations';
import { resetPassword } from 'store/auth/action';
import { CONSTANTS } from 'constants/index';
import RenderInput from 'components/common/elements/renderInput';
import RenderBtn from 'components/common/elements/renderBtn';
import { successToast, errorToast } from 'components/common/SnackBar';
import errorMessages from 'constants/errorMessages';
import './index.scss';
import maxLength from 'constants/maxLength';
import Logo from 'assets/images/TI_logo.svg';
import withError from 'utils/errorHoc';
import hideIcon from 'assets/images/hide.svg';
import viewIcon from 'assets/images/view.svg';

class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      confirmPassword: '',
      isConfirmPasswordDirty: false,
      isMatched: false,
      submitted: false,
      errors: {},
      showPassword: false,
    };
  }

  onShowPassword = () =>
    this.setState({ showPassword: !this.state.showPassword });

  handleChange = (property, value) => {
    let _errors = { ...this.state.errors };
    const validation = defaultValidation[property];

    if (property === 'confirmPassword') {
      this.setState({ isConfirmPasswordDirty: true });
    }

    if (validation) {
      let error = validation({ value });
      if (error) {
        _errors[property] = error;
      } else {
        delete _errors[property];
      }
      this.setState({ errors: { ..._errors } });
    }
    this.setState({ [property]: value }, () => {
      this.matchPassword();
    });
  };

  matchPassword = () => {
    const { isConfirmPasswordDirty, password, confirmPassword } = this.state;
    if (isConfirmPasswordDirty) {
      if (password === confirmPassword) {
        this.setState({ isMatched: true });
      } else {
        this.setState({ isMatched: false });
      }
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    const { errors, password, confirmPassword, isMatched } = this.state;
    const { resetPassword, match, history } = this.props;
    const resetPasswordObj = {};
    resetPasswordObj.password = password;
    resetPasswordObj.confirmPassword = confirmPassword;

    const resetPasswordFormErrors = validateForm({
      formData: resetPasswordObj,
      formFields: [
        'password',
        'confirmPassword',
      ],
    });

    if (errors) {
      if (Object.keys(errors).length > 0) {
        errorToast(errorMessages.resolve);
        document.getElementById(Object.keys(errors)[0]).focus();
      } else {
        if (Object.keys(resetPasswordFormErrors).length > 0) {
          errorToast(errorMessages.emptyFormError);
          document
            .getElementById(Object.keys(resetPasswordFormErrors)[0])
            .focus();
        } else if (!isMatched) {
          errorToast(errorMessages.resolve);
        } else {
          resetPassword({ token: match.params.token, password }).then(
            response => {
              if (response && response.result) {
                successToast(CONSTANTS.resetPwdTxt);
                history.push('/');
              } else {
                response.map(resp => errorToast(resp));
              }
            },
          );
        }
      }
    }
  };

  getConfirmPasswordError = () => {
    const { isConfirmPasswordDirty, isMatched } = this.state;
    if (isConfirmPasswordDirty && !isMatched) {
      return errorMessages.matchPassword('Password', 'Re-enter');
    }
  };

  isDisabled = () => {
    const { errors, password, confirmPassword, isMatched } = this.state;
    return (
      !password ||
      !confirmPassword ||
      Object.keys(errors).length !== 0 ||
      !isMatched
    );
  };

  render() {
    const { errors, password, confirmPassword, showPassword } = this.state;
    const _disabled = this.isDisabled();
    return (
      <div className="auth-form">
        <form className="auth-form__inner" onSubmit={this.handleSubmit}>
          <div className="auth-form__header">
            <img src={Logo} alt="logo" />
          </div>
          <div className="auth-form__body">
            <div className="auth-form__body--small">{CONSTANTS.resetPwd}</div>
            <RenderInput
              label="New Password"
              type="password"
              id="password"
              property="password"
              placeholder="Minimum 8 chars"
              value={password}
              onChange={({ value }) => {
                this.handleChange('password', value);
              }}
              maxLength={maxLength.name + 1}
              error={errors && errors['password']}
            />
            <RenderInput
              label="Re-enter Password"
              type={showPassword ? 'text' : 'password'}
              id="confirmPassword"
              property="confirmPassword"
              placeholder="Minimum 8 chars"
              value={confirmPassword}
              icon={showPassword ? viewIcon : hideIcon}
              handleIconClick={this.onShowPassword}
              onChange={({ value }) => {
                this.handleChange('confirmPassword', value);
              }}
              maxLength={maxLength.name + 1}
              error={this.getConfirmPasswordError()}
            />
          </div>
          <div className="auth-form__footer">
            <RenderBtn
              type="submit"
              onClick={this.handleSubmit}
              label="SUBMIT"
              disabled={_disabled}
            />
          </div>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = {
  resetPassword,
};

export default withError(
  withRouter(connect(null, mapDispatchToProps)(ResetPassword)),
);
