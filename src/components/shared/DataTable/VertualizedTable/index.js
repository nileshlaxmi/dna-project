import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import Paper from '@material-ui/core/Paper';
import { AutoSizer, Column, Table } from 'react-virtualized';
import { NoEncryption } from '@material-ui/icons';
import CellContent from '../CustomTableRow/CellContent';

const styles = (theme) => ({
  flexContainer: {
    display: 'flex',
    alignItems: 'center',
    boxSizing: 'border-box',
  },
  table: {
    // temporary right-to-left patch, waiting for
    // https://github.com/bvaughn/react-virtualized/issues/454
    '& .ReactVirtualized__Table__headerRow': {
      display: (props) => { return props.isHideHeader ? 'none' : 'flex' },
      flip: false,
      paddingRight: theme.direction === 'rtl' ? '0 !important' : undefined,
    },
    '& .ReactVirtualized__Grid:focus': {
      outline: 'none',
    },
  },
  tableRow: {
    cursor: 'pointer',
  },
  tableRowHover: {
    '&:hover': {
      backgroundColor: theme.palette.grey[200],
    },
  },
  tableCell: {
    flex: 1,
    padding: 12
  },
  noClick: {
    cursor: 'initial',
  },
});

class MuiVirtualizedTable extends React.PureComponent {
  static defaultProps = {
    headerHeight: 0,
    rowHeight: 48,
  };

  getRowClassName = ({ index }) => {
    const { classes, onRowClick } = this.props;

    return clsx(classes.tableRow, classes.flexContainer, {
      [classes.tableRowHover]: index !== -1 && onRowClick != null,
    });
  };

  cellRenderer = (columnsData) => {
    const { cellData, columnIndex } = columnsData;
    const { columns, classes, rowHeight, onRowClick } = this.props;
    return (
      <TableCell
        component="div"
        className={clsx(classes.tableCell, classes.flexContainer, {
          [classes.noClick]: onRowClick == null,
        })}
        variant="body"
        style={{ height: rowHeight, whiteSpace: "nowrap" }}
        align={
          (columnIndex != null && columns[columnIndex].numeric) || false
            ? 'right'
            : 'left'
        }
      >
        {cellData}
      </TableCell>
    );
  };

  headerRenderer = ({ label, columnIndex }) => {
    const { headerHeight, columns, classes, isHideHeader } = this.props;
    return (
      <TableCell
        component="div"
        className={clsx(
          classes.tableCell,
          classes.flexContainer,
          classes.noClick,
        )}
        variant="head"
        style={{ height: !isHideHeader ? 48 : headerHeight, whiteSpace: "nowrap" }}
        align={columns[columnIndex].numeric || false ? 'right' : 'left'}
      >
        <span>{label}</span>
      </TableCell>
    );
  };

  cellDataGetter = (row, col, tProps) => {
    const { dataKey, cellData } = col;
    const { rowData } = row;
    const { handleActions } = tProps;
    return <CellContent col={col} rowData={{ row: rowData, handleActions }} />;
  };

  render() {
    const {
      classes,
      tProps,
      columns,
      rowHeight,
      headerHeight,
      isHideHeader,
      ...tableProps
    } = this.props;
    return (
      <AutoSizer>
        {({ height, width }) => (
          <Table
            height={height}
            width={width}
            rowHeight={rowHeight}
            gridStyle={{
              direction: 'inherit',
            }}
            headerHeight={isHideHeader ? headerHeight : 48}
            className={classes.table}
            {...tableProps}
            rowClassName={this.getRowClassName}
          >
            {columns.map((col, index) => {
              const colData = { ...col };
              colData.width = (width * colData.width) / 100;
              return (
                <Column
                  key={index}
                  headerRenderer={(headerProps) =>
                      this.headerRenderer({
                          ...headerProps,
                          columnIndex: index,
                      })
                  }
                  cellDataGetter={row =>
                    this.cellDataGetter(row, colData, tProps)
                  }
                  className={classes.flexContainer}
                  cellRenderer={row => this.cellRenderer(row, colData)}
                  // dataKey={col.dataKey}
                  {...colData}
                />
              );
            })}
          </Table>
        )}
      </AutoSizer>
    );
  }
}

MuiVirtualizedTable.propTypes = {
  classes: PropTypes.object.isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      dataKey: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      numeric: PropTypes.bool,
      width: PropTypes.number.isRequired,
    }),
  ).isRequired,
  headerHeight: PropTypes.number,
  onRowClick: PropTypes.func,
  rowHeight: PropTypes.number,
};

const VirtualizedTable = withStyles(styles)(MuiVirtualizedTable);

const ReactVirtualizedTable = props => {
  const { rows, columns, isHideHeader } = props;
  const _height = (rows.length > 10 ? 10 : rows.length) * 48;
  return (
    <Paper style={{ height: _height, width: '100%', boxShadow: 'none' }}>
      <VirtualizedTable
        rowCount={rows.length}
        rowGetter={({ index }) => rows[index]}
        columns={columns}
        tProps={props}
        isHideHeader={isHideHeader}
      />
    </Paper>
  );
};
export default ReactVirtualizedTable;
