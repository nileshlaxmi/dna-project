import cn from 'classnames';
import React from 'react';
import CellActions from './CellActions';
import '../index.scss';

const CellContent = ({ rowData, col }) => {
  const {
    row,
  } = rowData;
  const {
    dataKey,
    cellData,
    className,
    actionItems,
    conditionalActions,
  } = col;
  let actions = actionItems;
  if (conditionalActions) {
    actions = conditionalActions(row);
  }
  if (actions) {
    return (
      <div className="action-container">
        <CellActions actions={actions} rowData={rowData} dataKey={dataKey} />
      </div>
    );
  } else if (cellData) {
    return cellData(rowData, col);
  } else {
    return (
      <div className={cn('cell', { [className]: true })} title={row[dataKey]}>
        {row[dataKey]}
      </div>
    );
  }
};

export default CellContent;
