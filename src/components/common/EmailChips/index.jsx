import React, { Component } from 'react';
import {
  validateRequired,
  validateMaxLength,
  constants,
} from 'utils/validations/common';
import errorMessages from 'constants/errorMessages';
import RenderInput from '../elements/renderInput';
import { checkValidDomain } from '../../../utils/index';
import './index.scss';

class EmailChips extends Component {
  state = {
    items: this.props.items ? [...this.props.items] : [],
    value: '',
    error: this.props.errors || null,
    ownUpdate: false,
  };

  static getDerivedStateFromProps = (nextProps, prevState) => {
    const payload = {};
    if (prevState.ownUpdate) payload.ownUpdate = false;
    else if (nextProps.items !== prevState.items)
      payload.items = nextProps.items;
    return payload;
  };

  onBlur = evt => {
    this.handleEmailValidation();
  };

  handleKeyDown = evt => {
    if (['Enter', 'Tab', ',', ' ', ';'].includes(evt.key)) {
      evt.preventDefault();
      this.handleEmailValidation();
    }
  };

  handleEmailValidation = () => {
    let value = this.state.value.trim();
    if (value && this.isValid(value)) {
      this.setState(
        {
          items: [...this.state.items, this.state.value],
          value: '',
          ownUpdate: true,
        },
        () =>
          this.props.onChange({
            items: this.state.items,
            error: this.state.error,
          }),
      );
    }
  };

  handleChange = ({ value }) => {
    const { isRequired, errorLabel } = this.props;
    let _error = '';
    if (isRequired) _error = this.isBlank(value, errorLabel);

    this.setState({ value, error: _error }, () =>
      this.props.onChange({ items: this.state.items, error: this.state.error }),
    );
  };

  handleDelete = item => {
    this.setState(
      {
        items: this.state.items.filter(i => i !== item),
        ownUpdate: true,
      },
      () => this.handleBlankErrorOnDelete(),
    );
  };

  handleBlankErrorOnDelete = () => {
    const { isRequired, errorLabel } = this.props;
    const { error } = this.state;
    let _error = error;
    let updatedValue = this.state.items.join(';');
    if (isRequired) {
      _error = this.isBlank(updatedValue, errorLabel);
      if (!updatedValue) {
        this.setState({ error: _error }, () => {
          this.props.onChange({
            items: [],
            error: _error,
          });
        });
      } else {
        this.props.onChange({
          items: this.state.items,
          error: _error,
        });
      }
    } else {
      this.props.onChange({
        items: this.state.items,
        error: _error,
      });
    }
  };

  handlePaste = evt => {
    evt.preventDefault();
    var paste = evt.clipboardData.getData('text');
    var emails = paste.match(
      /.+\@(telusinternational.com)+/gi, //  /([a-zA-Z0-9_\.\-])+\@(telusinternational.com)+/gi,
    );
    if (emails) {
      let toBeAdded = emails.filter(email => !this.isInList(email));
      let _toBeAdded = toBeAdded.filter(
        email => !this.isMaxLengthReached(email),
      );
      this.setState(
        {
          items: [...this.state.items, ..._toBeAdded],
          ownUpdate: true,
        },
        () =>
          this.props.onChange({
            items: this.state.items,
            error: this.state.error,
          }),
      );
    }
  };

  isValid = email => {
    let error = null;
    const { type } = this.props;
    if (type === 'domain') {
      if (this.isMaxLengthReached(email)) {
        error = errorMessages.maxLengthReached('Length of Domain', 100);
      } else if (this.isInList(email)) {
        error = `${email} has already been added.`;
      } else if (!this.isEmail(email)) {
        error = `${email} is not a valid domain.`;
      }
    } else {
      if (this.isMaxLengthReached(email)) {
        error = errorMessages.maxLengthReached('Length of Email', 100);
      } else if (this.isInList(email)) {
        error = `${email} has already been added.`;
      } else {
        const message = this.isEmail(email)
        if (!message.status) {
          error = message.error;
        }
      }
    }

    if (error) {
      this.setState({ error }, () =>
        this.props.onChange({
          items: this.state.items,
          error: this.state.error,
        }),
      );
      return false;
    }
    return true;
  };

  isBlank = (email, errorLabel) => {
    if (!validateRequired(email)) {
      return errorMessages.blank(errorLabel);
    }
  };

  isInList = email => {
    return (this.state.items || []).some(item =>
      new RegExp(email, 'i').test(item),
    );
  };

  isEmail = email => {
    const { type, domainList } = this.props;
    if (type === 'domain') {
      return constants.validDomain.test(email);
    } else {
      return checkValidDomain(email, domainList)
    }
  };

  isMaxLengthReached = email => {
    return !validateMaxLength(email, 100);
  };

  render() {
    const { items = [], value, error } = this.state;
    const { label, errors, type = 'email', placeholder = '' } = this.props;
    return (
      <div className="email-chips">
        {items && items.length > 0 && (
          <div className="chips-container">
            {items.map(item => (
              <>
                {type == 'email' ? <div className="tag-item" key={item} title={item}>
                  <span className="chip-text">{item}</span>
                  <button
                    type="button"
                    className="button"
                    onClick={() => this.handleDelete(item)}
                  >
                    &times;
                  </button>
                </div> : <div className="tag-item" key={item} title={item}>
                  <span className={`chip-text ${item.includes('telusinternational.com') ? 'default-domain' : ''}`}>{item}</span>
                  {!item.includes('telusinternational.com') && <button
                    type="button"
                    className="button"
                    onClick={() => this.handleDelete(item)}
                  >
                    &times;
                  </button>}
                </div>}

              </>
            ))}
          </div>
        )}
        <RenderInput
          id="value"
          property="value"
          value={value}
          error={errors || error}
          label={label}
          placeholder={placeholder ? placeholder : "Enter Email address(es) here"}
          evtReq={true}
          borderReq={items && items.length > 0 ? true : false}
          onBlur={this.onBlur}
          onKeyDown={this.handleKeyDown}
          onChange={this.handleChange}
          onPaste={this.handlePaste}
        />
      </div>
    );
  }
}

export default EmailChips;
