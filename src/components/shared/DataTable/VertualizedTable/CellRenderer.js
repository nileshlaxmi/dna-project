import React from 'react';
import clsx from 'clsx';
import TableCell from '@material-ui/core/TableCell';

const CellRenderer = ({ row, colData, tProps, classes }) => {
    const { cellData, columnIndex } = row;
    const { rowHeight, onRowClick } = tProps;
    return (
        <TableCell
            component="div"
            className={clsx(classes.tableCell, classes.flexContainer)}
            variant="body"
            style={{ height: rowHeight }}
            align={(colData.numeric) || false ? 'right' : 'left'}
        >
            {cellData}
        </TableCell>
    );
};
export default CellRenderer;