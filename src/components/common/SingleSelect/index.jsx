import React, { Component, Fragment } from 'react';
import cx from 'classnames';
import './index.scss';
import selectedbottick from 'assets/images/selected-bot-tick.svg';
import filterIcon from 'assets/images/filter.svg';

class SingleSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMenuOpen: false,
      search: false,
      filterText: '',
    };
  }

  componentDidMount() {
    const { closeMenuOnScroll } = this.props;
    if (closeMenuOnScroll) {
      window.addEventListener('scroll', () => {
        if (this.state.isMenuOpen) {
          this.setState({
            isMenuOpen: false,
            search: false,
          });
        }
      });
    }
  }

  closeMenu = () => {
    if (this.state.isMenuOpen) {
      let element = document.getElementById('root');
      if (element) {
        element.addEventListener('click', this.closeMenuOnDocumentClick);
      }
    } else {
      let element = document.getElementById('root');
      if (element) {
        element.removeEventListener('click', this.closeMenuOnDocumentClick);
      }
    }
  };

  showBotOptions = () => {
    let { isMenuOpen } = this.state;
    if (this.props.search) {
      if (isMenuOpen) {
        this.setState(
          {
            isMenuOpen: !isMenuOpen,
            search: false,
          },
          () => {
            this.closeMenu();
          },
        );
      } else {
        this.setState(
          {
            isMenuOpen: !isMenuOpen,
            search: true,
          },
          () => {
            this.closeMenu();
          },
        );
      }
    } else {
      this.setState(
        {
          isMenuOpen: !isMenuOpen,
        },
        () => {
          this.closeMenu();
        },
      );
    }
    if (this.props.onMenuOpen) {
      this.props.onMenuOpen();
    }
  };

  closeMenuOnDocumentClick = event => {
    let parent = event && event.target && event.target.parentElement.className;
    if (
      (parent &&
        parent.length &&
        parent.indexOf('bot-select') < 0 &&
        parent.indexOf('inputBoxDiv') < 0 &&
        parent.indexOf('header-bot-scroll') < 0) ||
      parent === '' ||
      (event && event.target && (event.target.nodeName === 'path' || event.target.nodeName === 'svg')) ||
      (event && event.target && (event.target.nodeName !== 'path' && event.target.nodeName !== 'svg' && event.target.className.indexOf('arrow-wrapper') >= 0))
    ) {
      if (this.props.search) {
        this.setState(
          {
            isMenuOpen: false,
            search: false,
            filterText: '',
          },
          () => {
            this.closeMenu();
          },
        );
      } else {
        this.setState(
          {
            isMenuOpen: false,
          },
          () => {
            this.closeMenu();
          },
        );
      }
    } else if ((event.target && event.target.src) || (event.target && event.target.id && event.target.id !== this.props.uniqueKey)) {
      if (this.props.search) {
        this.setState(
          {
            isMenuOpen: false,
            search: false,
            filterText: '',
          },
          () => {
            this.closeMenu();
          },
        );
      } else {
        this.setState(
          {
            isMenuOpen: false,
          },
          () => {
            this.closeMenu();
          },
        );
      }
    }
    if (this.props.onMenuClose) {
      this.props.onMenuClose();
    }
  };

  onDropdownChange = item => {
    if (this.props.search) {
      this.setState({
        isMenuOpen: false,
        search: false,
        filterText: '',
      });
    } else {
      this.setState({
        isMenuOpen: false,
      });
    }
    this.props.onDropdownChange(item);
  };

  onChange = event => {
    if (this.props.search) {
      this.setState({
        search: true,
        filterText: event.target.value,
        isMenuOpen: true,
      });
    } else {
      this.setState({
        isMenuOpen: true,
      });
    }
  };

  render() {
    const {
      selectedOption,
      options = [],
      disabled,
      type,
      customClass,
      getNode,
      search: isSearch,
      placeholder,
      isIconReq,
    } = this.props;
    const { filterText } = this.state;
    let searchFilter = options.filter(item =>
      item.label.toLowerCase().includes(filterText.toLowerCase()),
    );
    let value = '';
    if (type === 'pagination-dropdown') {
      value = selectedOption;
    } else {
      value = this.state.search
        ? this.state.filterText
        : (selectedOption && selectedOption.label) || '';
    }
    return (
      <div data-testid="botDropdown" className="botDropdown">
        <div
          data-testid="inputBoxDiv-ellipsis"
          className={`inputBoxDiv ellipsis ${disabled ? 'disabled' : ''}`}
          // style={disabled ? { backgroundColor: '#ebebe4' } : {}}
          onClick={() => {
            if (!disabled) {
              this.showBotOptions();
            }
          }}
        >
          {isIconReq ? (
            <>
              <img className="hand" src={filterIcon} alt={'select'} />
            </>
          ) : (
            <>
              <input
                className={`inputControl pointer ${disabled ? 'disabled' : ''} ${!isSearch ? 'noSearch' : ''}`}
                type="text"
                onChange={this.onChange}
                disabled={disabled}
                placeholder={placeholder || 'Select...'}
                value={value}
                title={(selectedOption || {}).label || ''}
                id={this.props.uniqueKey}
              />
              <span data-testid="arrow-wrapper" className="arrow-wrapper">
                <i className="fa fa-angle-down" aria-hidden="true"></i>
              </span>
            </>
          )}
        </div>

        {this.state.isMenuOpen && (
          <div className="header-bot-list">
            <div className="dropdown-menu dropdown-header-bot-box d-block">
              <div
                className={
                  'scrollbar scrollbar-height header-bot-scroll conversationBotListDropdown'
                }
              >
                {this.state.search ? (
                  searchFilter && searchFilter.length ? (
                    (searchFilter || []).map((item, i) => {
                      return (
                        <Fragment key={i}>
                          <a
                            className={cx(
                              'ellipsis dropdown-item dropdown-item-custom marT text-left ',
                              {
                                active:
                                  item.value ===
                                  ((selectedOption || {}).value || ''),
                              },
                              { [customClass]: customClass },
                            )}
                            title={item.label}
                            onClick={() => this.onDropdownChange(item)}
                          >
                            {item.label}
                            <div
                              className={
                                item.value ===
                                  ((selectedOption || {}).value || '')
                                  ? 'tick-icon'
                                  : 'd-none'
                              }
                            >
                              {/* <img width="20" src={selectedbottick} /> */}
                            </div>
                          </a>
                        </Fragment>
                      );
                    })
                  ) : (
                    <a
                      className={cx('ellipsis text-left dropdown-item-custom', {
                        [customClass]: customClass,
                      })}
                      data-testid="dropdownoption"
                      title="No Option Available"
                    >
                      No Option Available
                    </a>
                  )
                ) : (
                  options &&
                  (options || []).map(item => {
                    return (
                      <a
                        key={item.value}
                        onClick={() => this.onDropdownChange(item)}
                        title={item.label}
                        className={cx(
                          'ellipsis dropdown-item dropdown-item-custom marT text-left ',
                          {
                            active:
                              item.value ===
                              ((selectedOption || {}).value || ''),
                          },
                          { [customClass]: customClass },
                        )}
                      >
                        {item.label}
                        {getNode && getNode(item)}
                      </a>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
export default SingleSelect;
