import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { withRouter } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import { defaultValidation, validateForm } from 'utils/validations';
import { changePassword, logout } from 'store/auth/action';
import { CONSTANTS } from 'constants/index';
import RenderInput from 'components/common/elements/renderInput';
import RenderBtn from 'components/common/elements/renderBtn';
import { successToast, errorToast } from 'components/common/SnackBar';
import errorMessages from 'constants/errorMessages';
import './style.scss';
import maxLength from 'constants/maxLength';
import Logo from 'assets/images/TI_logo.svg';
import withError from 'utils/errorHoc';
import hideIcon from 'assets/images/hide.svg';
import viewIcon from 'assets/images/view.svg';

class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      old_pswd: '',
      new_pswd: '',
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
    const { isConfirmPasswordDirty, new_pswd, confirmPassword } = this.state;
    if (isConfirmPasswordDirty) {
      if (new_pswd === confirmPassword) {
        this.setState({ isMatched: true });
      } else {
        this.setState({ isMatched: false });
      }
    }
  };

  hide = () => {
    this.props.handler({ action: 'hide' });
  };

  handleSubmit = e => {
    e.preventDefault();
    const {
      errors,
      old_pswd,
      new_pswd,
      confirmPassword,
      isMatched,
    } = this.state;
    const { changePassword, logout } = this.props;

    const changePasswordObj = {};
    changePasswordObj.old_pswd = old_pswd;
    changePasswordObj.new_pswd = new_pswd;
    changePasswordObj.confirmPassword = confirmPassword;

    const changePasswordFormErrors = validateForm({
      formData: changePasswordObj,
      formFields: [
        'old_pswd',
        'new_pswd',
        'confirmPassword',
      ],
    });
    if (errors) {
      if (Object.keys(errors).length > 0) {
        errorToast(errorMessages.resolve);
        document.getElementById(Object.keys(errors)[0]).focus();
      } else {
        if (Object.keys(changePasswordFormErrors).length > 0) {
          errorToast(errorMessages.emptyFormError);
          document
            .getElementById(Object.keys(changePasswordFormErrors)[0])
            .focus();
        } else if (!isMatched) {
          errorToast(errorMessages.resolve);
        } else {
          changePassword({ old_pswd, new_pswd }).then(response => {
            if (response && response.result) {
              successToast(CONSTANTS.changePwdTxt);
              logout();
            } else {
              response.map(resp => errorToast(resp));
            }
          });
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
    const {
      errors,
      old_pswd,
      new_pswd,
      confirmPassword,
      isMatched,
    } = this.state;
    return (
      !old_pswd ||
      !new_pswd ||
      !confirmPassword ||
      Object.keys(errors).length !== 0 ||
      !isMatched
    );
  };

  render() {
    const {
      errors,
      old_pswd,
      new_pswd,
      confirmPassword,
      showPassword,
    } = this.state;
    const _disabled = this.isDisabled();
    return (
      <Modal show={true} onHide={this.hide} centered>
        <div className="reset-form-box change-password">
          <form className="auth-form__inner" onSubmit={this.handleSubmit}>
            <div className="auth-form__header">
              <img src={Logo} alt="logo" />
            </div>
            <div className="auth-form__body">
              <div className="auth-form__body--small">
                {CONSTANTS.changePwd}
              </div>
              <RenderInput
                label="Old Password"
                type="password"
                id="old_pswd"
                property="old_pswd"
                placeholder={CONSTANTS.minPwdChars}
                value={old_pswd}
                onChange={({ value }) => {
                  this.handleChange('old_pswd', value);
                }}
                maxLength={maxLength.name + 1}
                error={errors && errors['old_pswd']}
              />
              <RenderInput
                label="New Password"
                type="password"
                id="new_pswd"
                property="new_pswd"
                placeholder={CONSTANTS.minPwdChars}
                value={new_pswd}
                onChange={({ value }) => {
                  this.handleChange('new_pswd', value);
                }}
                maxLength={maxLength.name + 1}
                error={errors && errors['new_pswd']}
              />
              <RenderInput
                label="Re-enter Password"
                type={showPassword ? 'text' : 'password'}
                id="confirmPassword"
                property="confirmPassword"
                placeholder={CONSTANTS.minChars}
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
              <RenderBtn type="cancel" onClick={this.hide} label="CANCEL" />
            </div>
          </form>
        </div>
      </Modal>
    );
  }
}

const mapDispatchToProps = {
  changePassword,
  logout,
};

export default withError(
  withRouter(connect(null, mapDispatchToProps)(ChangePassword)),
);
