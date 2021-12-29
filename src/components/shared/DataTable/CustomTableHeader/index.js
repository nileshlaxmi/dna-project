import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from "@material-ui/core/Checkbox";
import '../index.scss';
import styles from '../style';

import SortingComp from './SortingComp';

const THeader = withStyles(styles)(({ rows, selectedRow, columns, handleSorting, onColumnClick: onClick, defaultSorting, classes, handleSelectAll }) => {

    return (
        <TableHead className={classes.tableHeader}>
            <TableRow className="row-root">
                {(columns || []).map((column, index) => {
                    const { align, minWidth, label, sorting } = column;
                    return <TableCell
                        key={`trow_${index}}`}
                        align={align}
                        style={{ minWidth }}
                        className="head"
                        onClick={onClick}
                        data-testid="header-cell-click"
                    >
                        {column.firstCol && !column.hideCheckbox && <Checkbox
                            className="checkbox-container"
                            onChange={(e) => handleSelectAll(e, rows)}
                            checked={rows && rows.length && rows.length === selectedRow.length}
                            // data-testid='checkbox-header'
                            inputProps={{ 'data-testid': `checkbox-header` }}
                        />}
                        {column.icon && <img src={column.icon.item} width={column.icon.width} height={column.icon.height} className="mr-1" />}
                        {sorting ? <SortingComp
                            classes={classes}
                            defaultSorting={defaultSorting}
                            columns={columns}
                            column={column}
                            handleSorting={handleSorting}
                            label={label}
                        /> : label}
                    </TableCell>
                })}
            </TableRow>
        </TableHead>
    )
});


export default THeader;