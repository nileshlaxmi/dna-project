/**
 * pageButton is a custom re-usable component for adding buttons on various pages.
 * It requires a custom pageButton object which provides following:
 * 'buttonClass' (class to be applied to button),
 * 'title' (text for button),
 * 'iconClass' (to show icon associated to button)
 * It also passes back 'handleClick event' (triggered upon button click)
 */

import React from 'react';
import './index.scss';

const PageButton = props => {
  let {
    iconClass = '',
    btnWrapper,
    pageButton = [],
    tooltip,
    handleClick = false,
    isdisabled,
    children,
  } = props;
  return (
    <div
      className={`page-btn ${btnWrapper}`}
      title={tooltip}
      data-testid="page-button"
    >
      {pageButton.map((btn, index) => {
        const {
          isButtonHide,
          customcss,
          buttonClass,
          actionType,
          iconComponent,
          svg,
          iconClass,
        } = btn;
        let btnIcon = null;
        if (iconComponent) {
          btnIcon = iconComponent;
        } else if (svg) {
          btnIcon = <img src={svg} alt="" />;
        } else if (iconClass) {
          btnIcon = <i className={btn.iconClass} aria-hidden="true" />;
        }

        return (
          <div key={index} className={`btn-group ${customcss}`}>
            {!isButtonHide && (
              <button
                type="button"
                className={`${buttonClass} ${iconClass}`}
                onClick={() => handleClick(actionType)}
                disabled={btn.disabled || isdisabled}
                data-action-type={actionType}
              >
                {btnIcon}
                {btn.title && <span className={`${btn.titleClass} mobile-hide-title`} >{btn.title}</span>}
              </button>
            )}
          </div>
        );
      })}
      {children}
    </div>
  );
};

export default PageButton;
