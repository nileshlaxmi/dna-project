import React from 'react';
import './index.scss';
import Delete from 'resources/images/Delete.svg';
import Import from 'resources/images/Import.svg';
import Train from 'resources/images/Train.svg';
import Update from 'resources/images/update.svg';
import Duplicate from 'resources/icons/duplicate.svg';
import Edit from 'resources/icons/edit.svg';
import Filters from 'resources/icons/filters.svg';
import DashboardSettings from 'resources/icons/gear_1.svg';
import Reload from 'resources/icons/reload.svg';
import GlobalIcon from 'resources/icons/globalicon.svg';
import Search from 'resources/icons/search.svg';
import Assign from 'resources/icons/icon-assign.svg';

const icons = {
  remove: Delete,
  import: Import,
  train: Train,
  update: Update,
  duplicate: Duplicate,
  edit: Edit,
  filters: Filters,
  reload: Reload,
  settings: DashboardSettings,
  global: GlobalIcon,
  search: Search,
  assign: Assign,
};

const IconButtons = props => {
  return (props.buttons.pageButton || []).map(
    (btn, index) =>
      btn &&
      !btn.hideButton && (
        <div
          key={(btn && (btn.actionType || '')) + index}
          className="btn-wrapper"
        >
          {btn && (
            <span
              onClick={
                !btn.disabled
                  ? btn.handleClick || props.buttons.handleClick
                  : undefined
              }
              data-action-type={btn.actionType}
              disabled={btn.disabled}
              title={btn.title}
              className={
                (btn.iconClass || '') + (btn.disabled ? 'disabled' : '')
              }
              data-testid={btn.testid || ''}
            >
              <img
                alt=""
                height="24px"
                width="24px"
                className={'chatbot-header-icon'}
                src={icons[btn.actionType]}
              />
            </span>
          )}
        </div>
      ),
  );
};

export default IconButtons;
