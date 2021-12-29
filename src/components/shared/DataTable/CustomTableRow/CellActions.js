import React from 'react';
import Switch from 'react-switch';
import '../index.scss';

const CellActions = ({ actions, rowData, dataKey }) => {
  const { row, classes, handleActions } = rowData;
  return actions.map((item, index) => {
    const isDisabled = item.isDisabled && item.isDisabled(row);
    if (item.customAction) {
      return item.customAction(rowData, item);
    }
    /**
     * Toggle action disabled, will be enabled once needed
     */

    // else if (item.isToggle) {
    //   return (
    //     <span
    //       key={'actions' + index}
    //       className="ml-1"
    //       title={item.title}
    //     >
    //       <Switch
    //         data-testid="toggle-action"
    //         onChange={e => !isDisabled && handleActions(item.actionType, row)}
    //         checked={item.toggleValue}
    //         uncheckedIcon={false}
    //         checkedIcon={false}
    //         height={16}
    //         width={30}
    //         className={item.customCSS}
    //         disabled={isDisabled}
    //       />
    //     </span>
    //   );
    // } 
    else if (item.icon) {
      return (
        <img
          key={index}
          src={item.icon}
          width={item.width}
          height={item.height}
          className={`${item.className || ''} ${isDisabled ? 'disabled' : 'hand'}`}
          title={item.title}
          data-testid="icon-action-btn"
          onClick={e => !isDisabled && handleActions(item.actionType, row)}
        />
      );
    } else {
      return (
        <span
          className="link-click"
          data-testid="link-actions-btn"
          title={row[dataKey]}
          onClick={e => handleActions(item.actionType, row)}
          key={index}
        >
          {row[dataKey]}
        </span>
      );
    }
  });
};

export default CellActions;
