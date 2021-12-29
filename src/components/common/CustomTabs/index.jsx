import React from 'react';
import { withRouter } from 'react-router-dom';
import './index.scss';

const CustomTabs = ({ tabs = [], activeTab = '', onChangeTab, customLabel }) => {
  return (
    <nav>
      <ul class="tabs">
        {
          tabs.map((tab) => (
            <li
              className={`tab hand ${tab.value === activeTab ? 'active' : ''}`}
              onClick={() => onChangeTab(tab.value)}
            >
              <div className="tab-label">{customLabel ? customLabel(tab) : tab.label}</div>
            </li>
          ))
        }
      </ul>
    </nav>
  );
};

export default withRouter(CustomTabs);
