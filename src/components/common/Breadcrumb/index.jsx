import React from 'react';
import { withRouter } from 'react-router-dom';
import nextIcon from 'assets/images/dropdown.svg';
import './index.scss';

const Breadcrumb = ({ breadCrumbsData = [], params = {}, history }) => {
  return (
    <div className="breadcrumb-container">
      <ol className="breadcrumb m-0 p-0">
        {breadCrumbsData &&
          !!breadCrumbsData.length &&
          breadCrumbsData.map((breadObj, index) => {
            const { icon, onClick, name, isActive } = breadObj;
            return (
              <li key={index}>
                {icon && (
                  <span className="root-icon">
                    <img src={icon} alt="root-icon" />
                  </span>
                )}
                {!!index && (
                  <span className="next-icon">
                    <img src={nextIcon} alt="next-icon" />
                  </span>
                )}
                <a
                  onClick={() =>
                    onClick && onClick(history, { ...breadObj, ...params })
                  }
                  title={name}
                  className={`${isActive ? 'active' : ''} ${onClick ? 'link' : ''
                    }`}
                >
                  {name}
                </a>
              </li>
            );
          })}
      </ol>
    </div>
  );
};

export default withRouter(Breadcrumb);
