import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import { AccordionLeftIcon, AccordionDownIcon } from 'assets/iconsComponent';
import CellContent from './CellContent';
import cn from 'classnames';

import '../index.scss';
import styles from '../style';

const CustomTableCell = withStyles(styles)(({ rowData, col, colIndex }) => {
  const {
    isCollapsible,
    row,
    classes,
    handleSelectedRow,
    selectedRow,
    handleDropdown,
    openedRow,
    rowIndex,
    openedRowIndex,
  } = rowData;
  const { firstCol, isCollapseIcon, hideCheckbox, width, isDisabled, minWidth } = col;
  const isRowSelected =
    selectedRow.length &&
    selectedRow.some(obj => obj.id === row.id || obj.id === row.uid);
  return (
    <TableCell
      key={rowIndex}
      className={cn(classes.tableCellRoot, { [classes.disableIcon]: isDisabled && isDisabled(row) })}
      width={width}
      style={{ minWidth }}
      data-testid={`table-cell-${rowIndex}`}
      {...col.cellProps}
    >
      {firstCol && !hideCheckbox && (
        <Checkbox
          className="checkbox-container"
          onChange={e => handleSelectedRow(e, row)}
          checked={!!isRowSelected}
          inputProps={{ 'data-testid': `checkbox-row` }}
        />
      )}
      {isCollapsible && isCollapseIcon && (
        <IconButton
          aria-label="expand row"
          size="small"
          onClick={e => handleDropdown(e, row, rowIndex)}
          data-testid={`icon-button-${rowIndex}`}
        >
          <div className="chevron" >
            {openedRowIndex === rowIndex ? (
              <AccordionDownIcon />
            ) : (
              <AccordionLeftIcon />
            )}
          </div>
        </IconButton>
      )}
      <CellContent rowData={rowData} col={col} />
    </TableCell>
  );
});

export default CustomTableCell;
