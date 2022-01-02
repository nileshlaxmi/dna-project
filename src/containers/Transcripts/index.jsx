import React, { Component } from "react";
import queryString from "query-string";
import withError from "utils/errorHoc";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { PaginationDataTable } from "components/shared/DataTable";
import "./index.scss";
import PageHeading from "components/common/PageHeading";
import { getGeneSymbolTranscript } from "store/transcripts/action";
import {
	transcriptsTableHeader,
	initialTableConfig,
} from "constants/transcripts";
import { transcriptListSelector } from "store/transcripts/selector";

class Transcripts extends Component {
	constructor(props) {
		super(props);
		const {
			species,
			gene_symbol,
			position,
			amino_acid_letter,
		} = queryString.parse(props.location.search);
		this.state = {
			tableConfig: { ...initialTableConfig },
			species,
			gene_symbol,
			position,
			amino_acid_letter,
		};
	}

	componentDidMount() {
		this.fetchData();
	}

	fetchData = () => {
		const {
			tableConfig,
			species,
			gene_symbol,
			position,
			amino_acid_letter,
		} = this.state;
		const request = {
			...tableConfig,
			species,
			gene_symbol,
			position,
			amino_acid_letter,
		};
		this.props.getGeneSymbolTranscript(request);
	};

	handleActions = (actionType, row) => {};

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

	render() {
		const { tableConfig } = this.state;
		const { transcriptsList, history } = this.props;
		const tableData = transcriptsList;

		return (
			<div className="page-body transcripts">
				<div className="heading-container">
					<PageHeading
						title="Transcripts"
						isSticky={true}
						isBackButton={true}
						handleBackClick={() => history.push("/")}
					/>
				</div>
				<PaginationDataTable
					dataTableProps={{
						columns: transcriptsTableHeader,
						rows: tableData.list,
						handleOnClick: () => {},
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
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		authInfo: state.auth,
		transcriptsList: transcriptListSelector(state),
	};
};

const mapDispatchToProps = {
	getGeneSymbolTranscript,
};

const ConnectedTranscripts = connect(
	mapStateToProps,
	mapDispatchToProps
)(Transcripts);

export default withError(withRouter(ConnectedTranscripts));
