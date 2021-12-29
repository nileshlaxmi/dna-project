import React, { useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Collapse from '@material-ui/core/Collapse';
import CustomTableCell from './CustomTableCell';
import '../index.scss';
import styles from '../style';

const TRow = withStyles(styles)(rowData => {
  const {
    isCollapsible,
    row,
    rowBg,
    rowIndex,
    columns = [],
    onRowClick: onClick,
    openedRowIndex,
    collapseContent,
  } = rowData;

  return (
    <>
      <TableRow
        hover
        role="checkbox"
        tabIndex={-1}
        key={`tbody_${rowIndex}`}
        onClick={onClick}
        className="root-row"
        style={{ background: rowBg }}
        data-testid={`table-row-${rowIndex}`}
      >
        {columns.map((col, index) => (
          <CustomTableCell
            key={`cell-${rowIndex}-${index}`}
            rowData={rowData}
            colIndex={index}
            col={col}
          />
        ))}
      </TableRow>

      {isCollapsible && rowIndex === openedRowIndex && (
        <TableRow className="view-info" style={{ background: rowBg }} data-testid={`table-row-collapsible-${rowIndex}`}>
          <TableCell
            colSpan={columns.length}
            style={{ padding: 0, paddingBottom: 0, paddingTop: 0, borderBottom: 'none' }}
          >
            <Collapse
              in={rowIndex === openedRowIndex}
              timeout="auto"
              unmountOnExit
              data-testid={`collapse-data-${rowIndex}`}
            >
              {collapseContent}
            </Collapse>
          </TableCell>
        </TableRow>
      )}
    </>
  );
});

export default TRow;
