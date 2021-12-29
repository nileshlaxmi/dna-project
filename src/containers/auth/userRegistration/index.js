import React, { Component } from 'react';
import { connect } from 'react-redux';
import { successToast, errorToast } from 'components/common/SnackBar';
import { withRouter } from 'react-router-dom';
import { defaultValidation, validateForm } from 'utils/validations';
import {
  checkTokenValidity,
  registerUser,
  signinSuccess,
} from 'store/auth/action';
import { CONSTANTS } from 'constants/index';
import RenderInput from 'components/common/elements/renderInput';
import RenderBtn from 'components/common/elements/renderBtn';
import errorMessages from 'constants/errorMessages';
import './style.scss';
import maxLength from 'constants/maxLength';
import Logo from 'assets/images/TI_logo.svg';
import withError from 'utils/errorHoc';
import hideIcon from 'assets/images/hide.svg';
import viewIcon from 'assets/images/view.svg';
import LinkExpired from './LinkExpired';
class UserRegistration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      name: '',
      // newPassword: '',
      // confirmPassword: '',
      // isConfirmPasswordDirty: false,
      // isMatched: false,
      submitted: false,
      isTokenValid: false,
      checkingValidity: false,
      errors: {},
      // showPassword: false,
    };
  }

  componentDidMount() {
    this.checkTokenValidity();
  }

  checkTokenValidity = () => {
    const { match } = this.props;
    const { tokenId } = match.params;
    this.setState({ checkingValidity: true });
    this.props.checkTokenValidity(tokenId).then(response => {
      if (response) {
        if (response.result && response.result.valid) {
          this.setState({
            isTokenValid: true,
            email: response.result.email,
            checkingValidity: false,
          });
        } else {
          this.setState({ checkingValidity: false });
          errorToast(response[0]);
        }
      }
    });
  };

  // onShowPassword = () =>
  //   this.setState({ showPassword: !this.state.showPassword });

  handleChange = (property, value) => {
    let _errors = { ...this.state.errors };
    const validation = defaultValidation[property];

    // if (property === 'confirmPassword') {
    //   this.setState({ isConfirmPasswordDirty: true });
    // }

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
      // this.matchPassword();
    });
  };

  // matchPassword = () => {
  //   const { isConfirmPasswordDirty, password, confirmPassword } = this.state;
  //   if (isConfirmPasswordDirty) {
  //     if (password === confirmPassword) {
  //       this.setState({ isMatched: true });
  //     } else {
  //       this.setState({ isMatched: false });
  //     }
  //   }
  // };

  handleSubmit = e => {
    e.preventDefault();
    const {
      errors,
      name,
      email,
      emp_id,
      // password,
      // confirmPassword,
      // isMatched,
    } = this.state;
    const { registerUser, match, history } = this.props;

    const regObj = {};
    regObj.emp_id = emp_id;
    regObj.name = name;
    // regObj.password = password;
    // regObj.confirmPassword = confirmPassword;

    const regFormErrors = validateForm({
      formData: regObj,
      formFields: [
        'emp_id',
        'name',
        // 'password',
        // 'password',
        // 'confirmPassword',
      ]
    });

    if (errors) {
      if (Object.keys(errors).length > 0) {
        errorToast(errorMessages.resolve);
        document.getElementById(Object.keys(errors)[0]).focus();
      } else {
        if (Object.keys(regFormErrors).length > 0) {
          errorToast(errorMessages.emptyFormError);
          document.getElementById(Object.keys(regFormErrors)[0]).focus();
        }
        // else if (!isMatched) {
        //   errorToast(errorMessages.resolve);
        // }
        else {
          registerUser({
            tokenId: match.params.tokenId,
            name,
            // password,
            emp_id,
            email,
          }).then(response => {
            if (response && response.result) {
              signinSuccess(response.result);
              successToast(CONSTANTS.registerUserSuccess);
              history.push('/dashboard');
            } else {
              response.map(resp => errorToast(resp));
            }
          });
        }
      }
    }
  };

  // getConfirmPasswordError = () => {
  //   const { isConfirmPasswordDirty, isMatched } = this.state;
  //   if (isConfirmPasswordDirty && !isMatched) {
  //     return errorMessages.matchPassword('Password', 'Confirm');
  //   }
  // };

  isDisabled = () => {
    const {
      errors,
      name,
      emp_id,
      // password,
      // confirmPassword,
      // isMatched,
    } = this.state;
    return (
      !name ||
      !emp_id ||
      // !password ||
      // !confirmPassword ||
      Object.keys(errors).length !== 0
      // !isMatched
    );
  };

  render() {
    const {
      isTokenValid,
      errors,
      email,
      name,
      password,
      confirmPassword,
      emp_id,
      showPassword,
    } = this.state;
    const _disabled = this.isDisabled();
    if (!isTokenValid) {
      return <LinkExpired />
    }
    return (
      <div className="auth-form">
        <form className="auth-form__inner" onSubmit={this.handleSubmit}>
          <div className="auth-form__header">
            <img src={Logo} alt="logo" />
          </div>
          <div className="auth-form__body">
            <div className="auth-form__body--small">
              {CONSTANTS.registration}
            </div>
            <RenderInput
              label="Email"
              type="text"
              property="email"
              disabled={true}
              value={email}
            />
            <RenderInput
              label="Employee ID"
              type="text"
              id="emp_id"
              property="emp_id"
              placeholder="Employee ID"
              value={emp_id}
              onChange={({ value }) => {
                this.handleChange('emp_id', value);
              }}
              maxLength={maxLength.name + 1}
              error={errors && errors['emp_id']}
            />
            <RenderInput
              label="Name"
              type="text"
              id="name"
              property="name"
              placeholder="Name"
              value={name}
              onChange={({ value }) => {
                this.handleChange('name', value);
              }}
              maxLength={maxLength.name + 1}
              error={errors && errors['name']}
            />
            {/* <RenderInput
              label="Password"
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
              label="Confirm Password"
              type={showPassword ? 'text' : 'password'}
              id="confirmPassword"
              property="confirmPassword"
              placeholder="Minimum 8 chars"
              icon={showPassword ? viewIcon : hideIcon}
              handleIconClick={this.onShowPassword}
              value={confirmPassword}
              onChange={({ value }) => {
                this.handleChange('confirmPassword', value);
              }}
              maxLength={maxLength.name + 1}
              error={this.getConfirmPasswordError()}
            /> */}
          </div>
          <div className="auth-form__footer">
            <RenderBtn
              type="submit"
              onClick={this.handleSubmit}
              label="Register"
              disabled={_disabled}
            />
          </div>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = {
  checkTokenValidity,
  registerUser,
  signinSuccess,
};

export default withError(
  withRouter(connect(null, mapDispatchToProps)(UserRegistration)),
);
