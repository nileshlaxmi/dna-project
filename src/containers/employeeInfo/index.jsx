import React from "react";
import withError from "utils/errorHoc";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { PaginationDataTable } from "components/shared/DataTable";
import CustomPopUp from "components/common/CustomPopUp";
import "./index.scss";
import PageHeading from "components/common/PageHeading";
import ImageCarousel from "components/common/ImageCarousel";
import {
	getFailedCapture,
	getSignedImageUrlUniqueLogin,
	fetchEmployeeInfo,
} from "store/retain/action";
import { initialTableConfig, employeeInfoPageData } from "constants/retain";
import moment from "moment";
import {
	getTimezoneOffset,
	getFileNameFromPath,
	getUserNameFromEmail,
	getUnretainedImageUrl,
} from "utils/functions";
import {
	failedCapturesListSelector,
	employeeDetailSelector,
} from "store/retain/selector";
import queryString from "query-string";
import ViewVideo from "./ViewVideo";
import ReactVirtualizedTable from "components/shared/DataTable/VertualizedTable";

class UserCaptures extends React.Component {
	constructor(props) {
		super(props);
		const { startDate, endDate, name, username } = queryString.parse(
			props.location.search
		);
		this.state = {
			tableConfig: { ...initialTableConfig },
			isCarouselOpen: false,
			filter: {
				startDate: startDate ? moment(startDate) : moment().startOf("month"),
				endDate: endDate ? moment(endDate) : moment(),
			},
			expandedRowIndex: null,
			name: name,
			username: username,
			empId: props.match.params.empId,
		};
	}

	componentDidMount() {
		this.fetchData();
	}

	setRequestParams = () => {
		const {
			tableConfig,
			filter: { startDate, endDate },
			username,
		} = this.state;
		const request = {
			...tableConfig,
			username: username,
			start_date: `${moment(startDate)
				// .startOf('day')
				.format("YYYY-MM-DDTHH:mm:ss")}Z`,
			end_date: `${moment(endDate)
				// .endOf('day';)
				.format("YYYY-MM-DDTHH:mm:ss")}Z`,
			time_zone: getTimezoneOffset(),
		};
		return request;
	};

	fetchData = () => {
		const request = this.setRequestParams();
		this.props.getFailedCapture(request);
	};

	getSignedUrlUniqueLogin = (row, image) => {
		const { getSignedImageUrlUniqueLogin } = this.props;
		const { username } = this.state;
		getSignedImageUrlUniqueLogin({
			userName: username,
			image: getFileNameFromPath(row.image_url),
		}).then((res) => {
			this.setState({
				isPopupOpen: true,
				signedURL: res && res.result,
				// selectedImages: getUnretainedImageUrl(row, image),
			});
		});
	};

	handleActions = (actionType, row, image) => {
		if (actionType === "showImage") {
			this.getSignedUrlUniqueLogin(row, image);
		}
	};

	setActivePage = (page) => {
		this.setState(
			(preState) => ({
				tableConfig: { ...preState.tableConfig, page },
			}),
			() => {
				this.fetchData();
			}
		);
	};
	sortList = (sort) => {
		this.setState(
			(preState) => ({
				tableConfig: {
					...preState.tableConfig,
					sortOrder: sort.sortOrder,
					sortBy: sort.dataKey,
				},
			}),
			() => {
				this.fetchData();
			}
		);
	};

	handleBackClick = () => {
		this.props.history.goBack();
	};

	closePopup = () => {
		this.setState({
			isPopupOpen: false,
			isConfirmRetain: false,
			signedImageUrl: null,
			selectedImages: null,
		});
	};

	setItemsPerPage = (item) => {
		this.setState(
			(preState) => ({
				tableConfig: { ...preState.tableConfig, size: item.value },
			}),
			() => {
				this.setActivePage(1);
			}
		);
	};

	handleExpand = (e, row, rowIndex) => {
		this.setState({
			expandedRowIndex:
				this.state.expandedRowIndex !== rowIndex ? rowIndex : null,
		});
	};

	render() {
		const {
			tableConfig,
			isPopupOpen,
			isCarouselOpen,
			signedURL,
			signedImgList,
			expandedRowIndex,
			filter: { startDate, endDate },
			name,
			empId,
		} = this.state;
		const { failedCapturesList, employeeDetails, authInfo } = this.props;
		const pageData = employeeInfoPageData;
		const tableData = failedCapturesList;
		const expandedRowsData =
			(expandedRowIndex !== null &&
				tableData.list[expandedRowIndex] &&
				tableData.list[expandedRowIndex].details) ||
			[];
		return (
			<div className={"page-body user-captures"}>
				<div className="heading-container">
					<PageHeading
						title={`${name} (${empId})`}
						// isDateTime
						subTitle={`${moment(startDate).format("DD-MMM-YYYY")} | ${moment(
							startDate
						).format("HH:mm")} To ${moment(endDate).format(
							"DD-MMM-YYYY"
						)} | ${moment(endDate).format("HH:mm")}`}
						isSticky={true}
						isSecondary={true}
						isBackButton={true}
						handleBackClick={this.handleBackClick}
						breadCrumbsData={{
							breadCrumbsData: pageData.breadcrumb,
							// params: { startDate, endDate, status, manager },
						}}
					/>
				</div>
				<PaginationDataTable
					dataTableProps={{
						columns: pageData.tableHeader(authInfo.user, employeeDetails),
						rows: tableData.list,
						handleOnClick: () => {},
						handleSorting: this.sortList,
						handleActions: this.handleActions,
						isCollapsible: true,
						collapsibleTableWidth: 980,
						handleDropdown: this.handleExpand,
						openedRowIndex: expandedRowIndex,
						collapseContent: (
							<ReactVirtualizedTable
								columns={pageData.expandTableHeader(
									authInfo.user,
									employeeDetails,
									3
								)}
								isHideHeader={true}
								rows={expandedRowsData}
								handleOnClick={() => {}}
								handleSorting={this.sortList}
								handleActions={this.handleActions}
								bgColor={"transparent"}
							/>
						),
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
				{isPopupOpen && (
					<CustomPopUp
						isPopupOpen={isPopupOpen}
						popupClosed={() => this.closePopup()}
						popupTitle={"Screen Capture"}
						containerClassname={"small-popup user-captures"}
					>
						<ViewVideo signedURL={signedURL} />
					</CustomPopUp>
				)}
				{/* {isCarouselOpen && (
          <CustomPopUp
            isPopupOpen={isCarouselOpen}
            popupClosed={() =>
              this.setState({
                isCarouselOpen: false,
              })
            }
            popupTitle={'Failed Capture'}
            containerClassname={'small-popup user-captures'}
          >
            <ImageCarousel images_List={signedImgList} />
          </CustomPopUp>
        )} */}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		authInfo: state.auth,
		failedCapturesList: failedCapturesListSelector(state),
		employeeDetails: employeeDetailSelector(state),
	};
};

const mapDispatchToProps = {
	getFailedCapture,
	fetchEmployeeInfo,
	getSignedImageUrlUniqueLogin,
};
const ConnectedUserCaptures = connect(
	mapStateToProps,
	mapDispatchToProps
)(UserCaptures);

export default withError(withRouter(ConnectedUserCaptures));
