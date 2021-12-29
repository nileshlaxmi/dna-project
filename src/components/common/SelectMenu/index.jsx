import React, { Component, Fragment } from 'react';
import './index.scss';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

class SelectMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
    };
  }

  onDropdownChange = item => {
    this.handleClose();
    this.props.onDropdownChange(item);
  };

  showMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const {
      selectedOption,
      options = [],
      disabled,
      placeholder,
      containerClass,
      readOnly,
    } = this.props;
    const { anchorEl } = this.state;

    return (
      <div className={`menuDropdown ${containerClass || ''}`}>
        <div
          className="inputBoxDiv ellipsis"
          style={disabled ? { backgroundColor: '#ebebe4' } : {}}
          onClick={e => {
            this.showMenu(e);
          }}
        >
          <input
            className={`inputControl pointer ${disabled ? 'disabled' : ''}`}
            type="text"
            onChange={this.onChange}
            disabled={disabled}
            placeholder={placeholder || 'Select...'}
            value={selectedOption}
            title={(selectedOption || {}).label || ''}
            readOnly={readOnly}
          />

          <span data-testid="arrow-wrapper" className="arrow-wrapper">
            <i className="fa fa-angle-down" aria-hidden="true"></i>
          </span>
        </div>

        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          disableScrollLock
          open={Boolean(anchorEl)}
          onClose={() => this.handleClose()}
          getContentAnchorEl={null}
          style={{ zIndex: '9999' }}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          {options &&
            (options || []).map(item => {
              return (
                <MenuItem
                  onClick={() => this.onDropdownChange(item)}
                  key={item.label}
                >
                  {item.label}
                </MenuItem>
              );
            })}
        </Menu>
      </div>
    );
  }
}
export default SelectMenu;
