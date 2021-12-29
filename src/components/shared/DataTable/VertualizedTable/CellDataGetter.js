import React from 'react';
import CellContent from '../CustomTableRow/CellContent';

const CellDataGetter = ({ row, colData, tProps }) => {
    const { rowData } = row;
    const { handleActions } = tProps;
    return (
        <CellContent col={colData} rowData={{ row: rowData, handleActions }} />
    )
}
export default CellDataGetter;