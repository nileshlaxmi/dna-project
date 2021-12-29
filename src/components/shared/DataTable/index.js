import cn from 'classnames';
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import CustomPagination from 'components/common/Pagination';
import CustomTableHeader from './CustomTableHeader';
import CustomTableRow from './CustomTableRow';
import variable from 'assets/scss/variable.scss';

import './index.scss';
import styles from './style';

const ascKey = 'asc';
class DataTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      openedRowIndex: null,
      selectedRow: [],
      columnSortingOn: [],
      defaultSorting: this.getDefaultSorting(),
    };
  }

  getDefaultSorting = () => {
    const { columns = [], initialSorting } = this.props;
    let defaultSorting = {};
    if (initialSorting) {
      const [defaultColumn] = columns.filter(column => {
        return column.dataKey === initialSorting.sortBy;
      });
      defaultSorting = { ...defaultColumn };
      defaultSorting['sortOrder'] = initialSorting.sortOrder;
    } else {
      const [defaultColumn] = columns.filter(({ sorting }) => sorting);
      defaultSorting = { ...defaultColumn };
      defaultSorting['sortOrder'] = ascKey;
    }
    return defaultSorting;
  };

  handleSorting = (column, sortOrder) => {
    const { handleSorting } = this.props;
    const defaultSorting = { ...column, sortOrder };
    this.setState({ defaultSorting }, () => {
      if (typeof handleSorting === 'function') {
        handleSorting(defaultSorting);
      }
    });
  };

  removeRow = (selectedRow = [], row) => {
    let index = null;
    selectedRow.some((obj, i) => {
      if (obj.id === row.id || obj.id === row.uid) {
        index = i;
        return true;
      }
      return false;
    });
    if (index > -1) {
      selectedRow.splice(index, 1);
    }
    return selectedRow;
  };

  handleSelectedRow = (e, row) => {
    e.preventDefault();
    e.stopPropagation();
    let selectedRow = this.props.selectedRow || [];
    if (e.target.checked) {
      selectedRow = [...selectedRow, { ...row, id: row.id ? row.id : row.uid }];
    } else {
      selectedRow = this.removeRow(selectedRow, row);
    }
    this.props.handleActions(
      'updateSelectedRows',
      selectedRow,
    )
    // this.setState(
    //   {
    //     ...selectedRow,
    //     selectedRow,
    //   },
    //   () => {
    //     setTimeout(
    //       () =>
    //         this.props.handleActions(
    //           'updateSelectedRows',
    //           this.state.selectedRow,
    //         ),
    //       50,
    //     );
    //   },
    // );
  };

  handleSelectAll = (e, row) => {
    e.preventDefault();
    e.stopPropagation();
    let selectedRow = [];
    if (e.target.checked) {
      selectedRow = this.props.rows.map(obj => ({
        ...obj,
        id: obj.id ? obj.id : obj.uid,
      }));
    }
    this.props.handleActions(
      'updateSelectedRows',
      selectedRow,
    )
    // this.setState(
    //   {
    //     ...selectedRow,
    //     selectedRow,
    //   },
    //   () => {
    //     setTimeout(
    //       () =>
    //         this.props.handleActions(
    //           'updateSelectedRows',
    //           this.state.selectedRow,
    //         ),
    //       50,
    //     );
    //   },
    // );
  };

  setRowBgColor = index => {
    const { bgColor = '', isModified = '', modifiedType = '' } = this.props;
    if (bgColor) return bgColor;
    else if (isModified && index === 0) {
      if (modifiedType === 'warning') return variable.warningRowHighlight;
      else if (modifiedType === 'failed') return variable.failedRowHighlight;
      else return variable.successRowHighlight;
    } else return index % 2 ? '#FFFFFF' : '#F7F7F8';
  };

  render() {
    const {
      rows = [],
      columns,
      classes,
      stickyHeader,
      containerSize,
      handleOnClick,
      handleActions,
      isCollapsible,
      collapseContent,
      isHideHeader,
      openedRowIndex,
      handleDropdown,
      selectedRow = [] // enabled managing row select with props
    } = this.props;
    const {
      defaultSorting,
      // selectedRow, // disabled managing row select with state
    } = this.state;
    return (
      <div className="table-root" data-testid="table-root">
        <Paper className={classes.root} elevation={0}>
          <TableContainer
            className={cn(classes.smallContainer, {
              [classes.extraSmallContainer]: containerSize === 'xs',
              [classes.mediumContainer]: containerSize === 'md',
              [classes.largeContainer]: containerSize === 'lg',
              [classes.customScrollbar]: true,
            })}
          >
            <Table
              stickyHeader={stickyHeader}
              className={classes.tableRoot}
              aria-label="sticky table"
            >
              {!isHideHeader && (rows || []).length ? (
                <CustomTableHeader
                  rows={rows}
                  columns={columns}
                  handleSorting={this.handleSorting}
                  defaultSorting={defaultSorting}
                  handleSelectAll={this.handleSelectAll}
                  selectedRow={selectedRow}
                />
              ) : (
                ''
              )}
              <TableBody>
                {(rows || []).map((row, index) => (
                  <CustomTableRow
                    key={index}
                    rowIndex={index}
                    row={row}
                    columns={columns}
                    handleOnClick={handleOnClick}
                    handleActions={handleActions}
                    handleSelectedRow={this.handleSelectedRow}
                    selectedRow={selectedRow}
                    handleDropdown={handleDropdown}
                    openedRowIndex={openedRowIndex}
                    isCollapsible={isCollapsible}
                    collapseContent={collapseContent}
                    rowBg={this.setRowBgColor(index)}
                  />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </div>
    );
  }
}

DataTable.defaultProps = {
  columns: [],
  rows: [],
  stickyHeader: true,
};

const EnhancedDataTable = withStyles(styles)(DataTable);

const PaginationDataTable = ({ dataTableProps, paginationProps }) => {
  return (
    <>
      <EnhancedDataTable {...dataTableProps} />
      {dataTableProps && paginationProps && (
        <CustomPagination {...paginationProps} />
      )}
    </>
  );
};

export { PaginationDataTable };

export default EnhancedDataTable;
