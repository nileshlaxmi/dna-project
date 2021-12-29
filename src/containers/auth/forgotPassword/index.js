import React, { Component } from 'react';
import { connect } from 'react-redux';
import { errorToast } from 'components/common/SnackBar';
import { withRouter } from 'react-router-dom';
import { defaultValidation } from 'utils/validations';
import { forgotPassword } from 'store/auth/action';
import { CONSTANTS } from 'constants/index';
import RenderInput from 'components/common/elements/renderInput';
import RenderBtn from 'components/common/elements/renderBtn';
import errorMessages from 'constants/errorMessages';
import './index.scss';
import maxLength from 'constants/maxLength';
import Logo from 'assets/images/TI_logo.svg';
import withError from 'utils/errorHoc';

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      submitted: false,
      errors: {},
      successMsg: '',
    };
  }

  handleChange = (property, value) => {
    let _errors = { ...this.state.errors };
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

  handleSubmit = e => {
    e.preventDefault();
    const { errors, email } = this.state;
    const { forgotPassword } = this.props;
    if (errors) {
      if (Object.keys(errors).length > 0) {
        errorToast(errorMessages.resolve);
        document.getElementById(Object.keys(errors)[0]).focus();
      } else {
        if (email.length > 0) {
          forgotPassword({ email }).then(response => {
            if (response && response.result) {
              this.setState({
                successMsg: CONSTANTS.forgotPasswordMailSuccess,
              });
            } else {
              this.setState({ successMsg: '' });
              response.map(resp => errorToast(resp));
            }
          });
        } else {
          errorToast(errorMessages.blank('Email'));
          document.getElementById('email').focus();
        }
      }
    }
  };

  renderMailMsg = successMsg => {
    const { history } = this.props;
    return (
      <div className="auth-form__mail-msg">
        <div>{successMsg}</div>
        <div className="auth-form__footer">
          <RenderBtn
            type="cancel"
            onClick={() => history.push(`/`)}
            label="BACK"
          />
        </div>
      </div>
    );
  };

  isDisabled = () => {
    const { errors, email } = this.state;
    return !email || Object.keys(errors).length !== 0;
  };

  render() {
    const { errors, email, successMsg } = this.state;
    const { history } = this.props;
    const _disabled = this.isDisabled();

    return (
      <div className="auth-form">
        <form className="auth-form__inner" onSubmit={this.handleSubmit}>
          <div className="auth-form__header">
            <img src={Logo} alt="logo" />
          </div>
          {successMsg ? (
            this.renderMailMsg(successMsg)
          ) : (
            <>
              <div className="auth-form__body">
                <div className="auth-form__body--small">
                  {CONSTANTS.forgotPwd}
                </div>
                <RenderInput
                  id="email"
                  label="Email"
                  type="text"
                  property="email"
                  value={email}
                  onChange={({ value }) => {
                    this.handleChange('email', value);
                  }}
                  maxLength={maxLength.name + 1}
                  error={errors && errors['email']}
                />
              </div>
              <div className="auth-form__footer">
                <RenderBtn
                  type="submit"
                  onClick={this.handleSubmit}
                  label="SUBMIT"
                  disabled={_disabled}
                />
                <div className="form-input__label-field text-center">
                  <label
                    className={'form-input__label-field--green'}
                    onClick={() => history.push(`/`)}
                  >
                    {CONSTANTS.login}
                  </label>
                </div>
              </div>
            </>
          )}
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = {
  forgotPassword,
};

export default withError(
  withRouter(connect(null, mapDispatchToProps)(ForgotPassword)),
);
