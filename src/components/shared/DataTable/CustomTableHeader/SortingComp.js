import React from 'react';
import cn from 'classnames';
import { ArrowDropUp, ArrowDropDown } from '@material-ui/icons';
import '../index.scss';

const ascKey = "asc";
const descKey = "desc";

const SortingComp = ({ classes, defaultSorting: { dataKey, sortOrder }, column, columns, handleSorting, label }) => {
    const activeColumn = columns.find((column) => column.dataKey === dataKey) || {};
    const clsKey = column['dataKey'] === activeColumn['dataKey'] ? classes.activeColumn : classes.inactiveColumn;
    const className = cn(classes.headIcon, { [clsKey]: true });
    let ActionComponent = ArrowDropDown;
    let nextSort = descKey;
    if (column['dataKey'] === dataKey) {
        ActionComponent = sortOrder === ascKey ? ArrowDropDown : ArrowDropUp;
        nextSort = sortOrder === ascKey ? descKey : ascKey;
    }

    return (
        <span onClick={() => handleSorting(column, nextSort)} className={classes.headIcon} data-testid="table-sort">
            {label}
            <span data-testid="test-sorting-comp" className={className}>
                <ActionComponent />
            </span>
        </span>
    )
}


export default SortingComp;