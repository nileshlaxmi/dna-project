import React from 'react';
import clsx from 'clsx';
import TableCell from '@material-ui/core/TableCell';

const HeaderRenderer = ({ colData, classes, headerHeight }) => {
    return (
        <TableCell
            component="div"
            className={clsx(classes.tableCell, classes.flexContainer, classes.noClick)}
            variant="head"
            width={'25%'}
            style={{ height: headerHeight, width: '25%' }}
            align={(colData.numeric) || false ? 'right' : 'left'}
        >
            <span>{colData.label}</span>
        </TableCell>
    );
};
export default HeaderRenderer;