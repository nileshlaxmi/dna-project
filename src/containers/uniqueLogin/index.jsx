import React, { Component } from 'react';
import withError from 'utils/errorHoc';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { PaginationDataTable } from 'components/shared/DataTable';
import CustomPopUp from 'components/common/CustomPopUp';
import './index.scss';
import PageHeading from 'components/common/PageHeading';
import {
  fetchRetainUsers,
  fetchEmpDetails,
} from 'store/retain/action';
import {
  retainUsersTableHeader,
  initialTableConfig,
} from 'constants/retain';
import moment from 'moment';
import { getTimezoneOffset } from 'utils/functions';
import {
  retainUsersListSelector,
} from 'store/retain/selector';
import EmpInfoPopUp from 'components/common/EmpInfoPopUp';


class Retain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableConfig: { ...initialTableConfig },
      showInfo: false,
      filters: {
        startDate: moment().startOf('month'),
        endDate: moment()
      }
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    const {
      tableConfig,
      filters: { startDate, endDate }
    } = this.state;
    const request = {
      ...tableConfig,
      start_date: `${moment(startDate).format('YYYY-MM-DDTHH:mm:ss')}Z`,
      end_date: `${moment(endDate).format('YYYY-MM-DDTHH:mm:ss')}Z`,
      time_zone: getTimezoneOffset(),
    };
    this.props.fetchRetainUsers(request);
  };

  handleActions = (actionType, row) => {
    const {
      filters: { startDate, endDate },
    } = this.state;
    if (actionType === 'viewAction') {
      this.props.history.push(
        `/employee-info/${row.emp_id}?startDate=${moment(startDate).format(
          'ddd MMM DD YYYY HH:mm:ss',
        )}&endDate=${moment(endDate).format(
          'ddd MMM DD YYYY HH:mm:ss',
        )}&name=${row.name}&username=${row.username}`,
      );
    } else if (actionType === 'showEmpInfo') {
      this.props
        .fetchEmpDetails(row['uid'])
        .then(res => {
          this.setState({
            showInfo: true,
            empDetails: res && res.result,
          });
        })
        .catch(err => console.log(err));
    }
  };

  setActivePage = page => {
    this.setState(
      preState => ({
        tableConfig: { ...preState.tableConfig, page },
      }),
      () => {
        this.fetchData();
      },
    );
  };

  sortList = sort => {
    this.setState(
      preState => ({
        tableConfig: {
          ...preState.tableConfig,
          sortOrder: sort.sortOrder,
          sortBy: sort.dataKey,
        },
      }),
      () => {
        this.fetchData();
      },
    );
  };


  setItemsPerPage = item => {
    this.setState(
      preState => ({
        tableConfig: { ...preState.tableConfig, size: item.value },
      }),
      () => {
        this.setActivePage(1);
      },
    );
  };


  render() {
    const {
      tableConfig,
      showInfo,
      empDetails,
    } = this.state;

    const {
      retainUsersList,
      authInfo,
    } = this.props;

    const tableData = retainUsersList;
    return (
      <div className="page-body unique-login">
        <div className="heading-container">
          <PageHeading
            title={`Screen Capturing`}
            isSticky={true}
          // isSecondary={true}
          // isBackButton={true}
          // handleBackClick={() => history.push('/dashboard')}
          // breadCrumbsData={{ breadCrumbsData: pageData.breadcrumb }}
          />
        </div>
        <PaginationDataTable
          dataTableProps={{
            columns: retainUsersTableHeader(authInfo.user),
            rows: tableData.list,
            handleOnClick: () => { },
            handleSorting: this.sortList,
            handleActions: this.handleActions,
            initialSorting: tableConfig,
          }}
          paginationProps={{
            totalItemsCount: tableData.count,
            activePage: tableConfig.page,
            itemsCountPerPage: tableConfig.size,
            setItemsPerPage: this.setItemsPerPage,
            setActivePage: this.setActivePage,
            isHidePaginationDropdown: false,
            rows: tableData.list,
          }}
        />
        {showInfo && (
          <CustomPopUp
            isPopupOpen={showInfo}
            popupClosed={() => this.setState({ showInfo: false })}
            popupTitle={'Employee Information'}
            containerClassname={'emp-info-popup'}
          >
            <EmpInfoPopUp empData={empDetails} source="Unique_Login" />
          </CustomPopUp>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    authInfo: state.auth,
    retainUsersList: retainUsersListSelector(state),
  };
};

const mapDispatchToProps = {
  fetchRetainUsers,
  fetchEmpDetails,
};
const ConnectedRetain = connect(mapStateToProps, mapDispatchToProps)(Retain);

export default withError(withRouter(ConnectedRetain));
