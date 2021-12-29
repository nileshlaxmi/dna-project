import React, { useState } from "react";
import moment from "moment";
import rootIcon from "assets/images/Dashbaord.svg";
import viewIcon from "assets/images/view.svg";
import retainIcon from "assets/images/retain.svg";
import retainDisabledIcon from "assets/images/retain_disabled.svg";
import viewRetainedImages from "assets/images/view-retainedImages.svg";
import exemptIcon from "assets/images/exempt.svg";
import resumeIcon from "assets/images/resume.svg";
import closeIcon from "assets/images/pop-up-close.svg";
import Checkbox from "@material-ui/core/Checkbox";
import {
	getUnretainedImageUrl,
	getUnretainedImageUrlFromDay,
} from "utils/functions";
import { inputTypes } from "constants/index";
import ChannelComponent from "components/common/ChannelComponent";
import videoIcon from "assets/images/video.svg";

const { select } = inputTypes;

export const report = [{ label: "CSV", value: "csv" }];

export const reasonsList = [
	{ label: "Face Obscured", value: "Face obscured" },
	{ label: "No face detected", value: "No face detected" },
];

export const initialTableConfig = {
	sortOrder: "",
	sortBy: "",
	page: 1,
	size: 10,
};

export const retainedListBreadCrumbsData = [
	{
		icon: rootIcon,
		name: "Dashboard",
		uid: "",
		onClick: (history) => history.push("/dashboard"),
	},
	{
		name: "Retained",
		uid: "",
		isActive: true,
	},
];

export const uniqueLoginCalendarRange = {
	Today: [moment(), moment()],
	Yesterday: [moment().subtract(1, "days"), moment().subtract(1, "days")],
	// 'Last 7 Days': [moment().subtract(6, 'days'), moment()],
	"Last 30 Days": [moment().subtract(29, "days"), moment()],
	// 'Last 90 Days': [moment().subtract(89, 'days'), moment()],
	// 'Last 365 Days': [moment().subtract(364, 'days'), moment()],
};

export const dashboardCalendarRange = {
	Today: [moment(), moment()],
	Yesterday: [moment().subtract(1, "days"), moment().subtract(1, "days")],
	// 'Last 7 Days': [moment().subtract(6, 'days'), moment()],
	"Last 30 Days": [moment().subtract(29, "days"), moment()],
	// 'Last 90 Days': [moment().subtract(89, 'days'), moment()],
	// 'Last 365 Days': [moment().subtract(364, 'days'), moment()],
};

export const retainUsersTableHeader = (user) => [
	{
		label: "Emp ID",
		dataKey: "emp_id",
		className: "show-ellipsis uppercase-text",
		width: "10%",
		// isCollapseIcon: true,
		// isDisabled: row => !row.active,
		// cellData: ({ row, handleActions }) => {
		//   return (
		//     <a className="hand" onClick={() => handleActions('showEmpInfo', row)}>
		//       {row.emp_id}
		//     </a>
		//   );
		// },
	},
	{
		label: "Emp Name",
		dataKey: "name",
		className: "show-ellipsis capitalize",
		width: "15%",
		// sorting: true,
		// isDisabled: row => !row.active,
	},
	{
		label: "Email ID",
		dataKey: "email",
		className: "show-ellipsis",
		width: "25%",
		// isDisabled: row => !row.active,
	},
	{
		label: "No. of Capture",
		dataKey: "clip_count",
		width: "10%",
		// sorting: true,
		// isDisabled: row => !row.active,
	},

	{
		label: "Last Capture",
		dataKey: "latest_created",
		className: "show-ellipsis",
		cellData: ({ row }) => {
			return (
				<span title={moment(row.last_capture).format("DD-MMM-YYYY HH:mm")}>
					{moment(row.last_capture).format("DD-MMM-YYYY HH:mm")}
				</span>
			);
		},
		width: "15%",
		// sorting: true,
		// isDisabled: row => !row.active,
	},
	{
		label: "Channel",
		dataKey: "channel",
		width: "15%",
		// sorting: true,
		cellData: (props) => <ChannelComponent {...props} />,
	},
	{
		label: "Action",
		dataKey: "action",
		width: "10%",
		cellProps: {
			align: "left",
		},
		conditionalActions: (row) => {
			const actions = [
				{
					title: "View Employee Details",
					actionType: "viewAction",
					icon: viewIcon,
					width: 20,
					height: 20,
					className: "",
					// isDisabled: row =>
					//   (!row.failed_login && !row.successfull_login) || !row.active,
				},
			];
			return actions;
		},
	},
];

export const failedCapturesTableHeader = (user, employeeDetails, source) => [
	{
		isCollapseIcon: true,
		label: "",
		dataKey: "",
		width: "10%",
	},
	{
		label: "Date",
		dataKey: "date",
		cellData: ({ row }) => {
			return moment(row.date).format("DD-MMM-YYYY");
		},
		width: "35%",
	},
	{
		label: "Time",
		dataKey: "created",
		cellData: ({ row }) => {
			return (
				<>
					<div>
						<span style={{ color: "#71757B", marginRight: "2px" }}>
							Last Capture:
						</span>
						<span>{moment(row.start_time).format("HH:mm")}</span>
					</div>
					<div>
						<span style={{ color: "#71757B", marginRight: "2px" }}>
							First Capture:
						</span>
						<span>{moment(row.end_time).format("HH:mm")}</span>
					</div>
				</>
			);
		},
		width: "35%",
	},
	// {
	// 	label: "Channel",
	// 	dataKey: "",
	// 	width: user.role !== "viewer" ? "15%" : "20%",
	// },
	{
		label: "No. of Captures",
		dataKey: "items",
		width: user.role !== "viewer" ? "20%" : "20%",
	},
	// {
	//   label: 'Reason',
	//   dataKey: '',
	//   width: user.role !== 'viewer' ? '15%' : '20%',
	// },
	// {
	// 	label: "Action",
	// 	dataKey: "action",
	// 	width: "10%",
	// 	cellProps: {
	// 		align: "left",
	// 	},
	// 	conditionalActions: (row) => {
	// 		const actions = [
	// 			{
	// 				title: "View Employee Details",
	// 				actionType: "viewAction",
	// 				icon: viewIcon,
	// 				width: 20,
	// 				height: 20,
	// 				className: "",
	// 				// isDisabled: row =>
	// 				//   (!row.failed_login && !row.successfull_login) || !row.active,
	// 			},
	// 		];
	// 		return actions;
	// 	},
	// },
];

export const failedCapturesExpandTableHeader = (
	user,
	employeeDetails,
	numCaptures = 3
) => [
	{
		label: "",
		dataKey: "",
		// width: '5%',
		width: 10,
	},
	{
		label: "Date",
		dataKey: "",
		// width: '25%',
		width: 35,
	},
	{
		label: "Time",
		dataKey: "created",
		cellData: ({ row }) => {
			return `${moment(row.capture_time).format("HH:mm")}`;
		},
		// width: '20%',
		width: 35,
	},
	// {
	// 	label: "Channel",
	// 	dataKey: "channel",
	// 	// width: '20%',
	// 	width: user.role !== "viewer" ? 15 : 20,
	// 	cellData: (props) => <ChannelComponent {...props} />,
	// },
	{
		label: "No. of Captures",
		dataKey: "image",
		// width: '20%',
		width: user.role !== "viewer" ? 20 : 20,
		cellData: ({ row, handleActions }) => {
			return (
				<img
					src={videoIcon}
					alt="video"
					className={row.image_url ? "hand" : ""}
					onClick={() => handleActions("showImage", row)}
				/>
			);
			// return ([row.image_url] || []).map(image => (
			//   <span
			//     className={image ? 'hand' : ''}
			//     title={image ? 'Click to view image' : ''}
			//     onClick={() => {
			//       image && handleActions('showImage', row, image);
			//     }}
			//   >
			//     <Checkbox
			//       className={`checkbox-container ${image && image.status ? 'disabled' : ''
			//         }`}
			//       checked={!!image}
			//       disabled={true}
			//     />
			//   </span>
			// ));
		},
	},
	// {
	// 	label: "Action",
	// 	dataKey: "action",
	// 	width: "10%",
	// 	cellProps: {
	// 		align: "left",
	// 	},
	// 	conditionalActions: (row) => {
	// 		const actions = [
	// 			{
	// 				title: "View Employee Details",
	// 				actionType: "viewAction",
	// 				icon: viewIcon,
	// 				width: 20,
	// 				height: 20,
	// 				className: "",
	// 				// isDisabled: row =>
	// 				//   (!row.failed_login && !row.successfull_login) || !row.active,
	// 			},
	// 		];
	// 		return actions;
	// 	},
	// },
];

//====================================NEW PAGE=============
export const employeeInfoPageData = {
	tableHeader: failedCapturesTableHeader,
	expandTableHeader: failedCapturesExpandTableHeader,
	breadcrumb: [
		// {
		//   icon: rootIcon,
		//   name: 'Dashboard',
		//   uid: '',
		//   onClick: history => history.push('/dashboard'),
		// },
		{
			name: "Screen Capture",
			uid: "",
			onClick: (history, { startDate, endDate, source, status, manager }) =>
				history.push(
					`/unique-login?startDate=${moment(startDate).format(
						"ddd MMM DD YYYY HH:mm:ss"
					)}&endDate=${moment(endDate).format(
						"ddd MMM DD YYYY HH:mm:ss"
					)}&source=${source}${status ? "&status=" + status : ""}${
						manager ? "&manager=" + manager : ""
					}`
				),
		},
		{
			name: "Employee Information",
			uid: "",
			isActive: true,
		},
	],
};

export const empInfoFieldsUniqueLogin = [
	{
		label: "Emp ID",
		dataKey: "emp_id",
	},
	{
		label: "Emp Name",
		dataKey: "name",
		valueClassName: "capitalize",
	},
	{
		label: "Email ID",
		dataKey: "email",
	},
	{
		label: "Status",
		dataKey: "active",
		cellData: (empData) => {
			return empData["active"] ? "Active" : "Deactivated";
		},
		showField: (empData) => {
			return true;
		},
	},
	{
		label: "Reporting Manager",
		dataKey: "reporting_manager",
		valueClassName: "capitalize",
	},
	{
		label: "Reporting Manager Email ID",
		dataKey: "reporting_manager_email",
	},
	{
		label: "WFM Name",
		dataKey: "work_force_manager_name",
		valueClassName: "capitalize",
	},
	{
		label: "WFM Email id",
		dataKey: "work_force_manager",
	},
	{
		label: "Deactivated On",
		dataKey: "active",
		cellData: (empData) => {
			return !empData["active"]
				? moment(empData["deactivated"]).format("DD-MMM-YYYY")
				: null;
		},
		className: "form-field",
		showField: (empData) => {
			return !empData["active"] ? true : false;
		},
	},
	{
		label: "Group",
		dataKey: "group",
		cellData: (empData) => {
			return null;
			// return (
			//   groupOptions.find(group => group.value === empData['group']).label || ''
			// );
		},
	},
	{
		label: "Retained Images",
		dataKey: "retained_images",
		className: "form-field fontBold",
		showField: (empData) => {
			return empData["retained_images"] >= 0 ? true : false;
		},
	},
	{
		label: "Exempted On",
		dataKey: "exempted_on",
		className: "chip-container",
		cellData: (empData) => {
			return (empData["exempted_on"] || []).map((date) => {
				return (
					<div className="chip-container__chip">{`${moment(
						date.start_date
					).format("DD-MMM-YYYY")}   To   ${moment(date.end_date).format(
						"DD-MMM-YYYY"
					)}`}</div>
				);
			});
		},
	},
];
