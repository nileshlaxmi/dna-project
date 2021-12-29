import React, { Component } from 'react';
import './style.scss';
import { DownloadIcon } from 'assets/iconsComponent';
import PageButton from 'components/common/PageButton';

class Dropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openDropdown: false,
    };
  }

  componentDidMount() {
    document
      .getElementById('root')
      .addEventListener('click', this.hideSearchMenuOnDocumentClick);
  }

  handleClick(type) {
    this.props.sendReport();
    this.closeDropdown();
  }

  hideSearchMenuOnDocumentClick = event => {
    let triggerEl = false;
    const path =
      event.path ||
      (event.composedPath && event.composedPath()) ||
      this.composedPath(event.target);
    if (path && path.length) {
      path.some(el => {
        if (
          el.className &&
          el.className.length &&
          el.className.indexOf('dropdown-menu-report') >= 0
        ) {
          triggerEl = true;
          return true;
        }
        return false;
      });
    }
    if (triggerEl) {
      return false;
    }
    this.closeDropdown();
  };

  composedPath(element) {
    let el = element;
    var path = [];
    while (el) {
      path.push(el);
      if (el.tagName === 'HTML') {
        path.push(document);
        path.push(window);
        return path;
      }
      el = el.parentElement;
    }
  }

  componentWillUnmount() {
    document
      .getElementById('root')
      .removeEventListener('click', this.hideSearchMenuOnDocumentClick);
  }

  closeDropdown = () => {
    this.setState({ openDropdown: false });
  };

  render() {
    const { openDropdown } = this.state;
    const { report, fillColor, title } = this.props;

    return (
      <div className={'report-btn-container'}>
        <PageButton
          handleClick={() => this.setState({ openDropdown: true })}
          tooltip= 'Export Report'
          pageButton={[
            {
              buttonClass: `btn ${title ? `btn-outline-success` : 'download-icon'} btn-spacing export-as ${openDropdown ? 'selected' : ''
                }`,
              iconClass: '',
              title: title || '',
              titleClass: 'title',
              iconComponent: <DownloadIcon fillColor={fillColor ? fillColor : "#248700"} />,
            },
          ]}
        />
        {openDropdown && (
          <div className="dropdown-menu-report">
            {(report || []).map((item, index) => {
              return (
                <a
                  key={index}
                  className="dropdown-item"
                  onClick={() => this.handleClick(item.value)}
                >
                  {item.label}
                </a>
              );
            })}
          </div>
        )}
      </div>
    );
  }
}

export default Dropdown;
