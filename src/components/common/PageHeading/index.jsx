import React, { Component } from 'react';
import PropTypes from 'prop-types';
import backIcon from 'assets/images/back.svg';
import ToolTip from 'components/common/ToolTip';
import './index.scss';
import Breadcrumb from 'components/common/Breadcrumb';
import clockIcon from 'assets/images/time-icon.svg';
import iconTeamMember from 'assets/images/team-icon.svg';

const isEllipsisEnabled = () => window.screen.width <= 460;
const PageHeading = ({
  isBackButton,
  handleBackClick,
  isSecondary,
  isSticky,
  title,
  subTitle,
  children,
  iconReq,
  src,
  altText,
  imgOnClick,
  subtitleClassname,
  breadCrumbsData,
  teamIcon,
  getTeamInfo,
  isDateTime,
}) => {
  return (
    <>
      {breadCrumbsData && <Breadcrumb {...breadCrumbsData} />}
      <div
        className={`page-heading-section ${isSecondary ? 'secondary' : ''} ${isSticky ? 'sticky' : ''
          }`}
      >
        <div className="page-heading">
          {isBackButton && (
            <span className="back" onClick={handleBackClick}>
              <img src={backIcon} />
            </span>
          )}
          {title && (
            <h4 className="" data-testid="page-heading-test">
              <span title={title}>{title}</span>
            </h4>

          )}
          {subTitle && isDateTime ? (
            <>
              <img
                src={clockIcon}
                alt="subTitle"
                data-for={'clock'}
                data-tip={subTitle}
              />
              <ToolTip
                id={'clock'}
                delayHide={200}
                className={'tooltip-text'}
              />
            </>
          ) : (
            <h6>
              <span className="ellipsis">{subTitle}</span>
            </h6>
          )}
          {/* {isEllipsisEnabled && (
            <ToolTip
              id="mobile-title"
              className={'tooltip-text'}
              delayHide={200}
            />
          )} */}
          {iconReq && <img src={src} alt={altText} onClick={imgOnClick} />}
          {teamIcon && <div className="team-icon">
            <img src={iconTeamMember} onClick={() => getTeamInfo()} alt="Team Members" />
          </div>}
        </div>
        <div className="page-heading-actions">{children}</div>
      </div>
    </>
  );
};

PageHeading.propTypes = {
  title: PropTypes.string.isRequired,
};

export default PageHeading;
