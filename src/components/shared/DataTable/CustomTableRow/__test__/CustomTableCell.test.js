import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect';
import CustomTableCell from '../CustomTableCell';
import renderWithRouterAndRedux from 'utils/testUtils';
// import editIcon from 'assets/images/timon.png'


const rowData = {
  "classes": {
    "root": "Component-root-40",
    "tableCellRoot": "Component-tableCellRoot-41",
    "extraSmallContainer": "Component-extraSmallContainer-42",
    "smallContainer": "Component-smallContainer-43 Component-smallContainer-249",
    "mediumContainer": "Component-mediumContainer-44",
    "largeContainer": "Component-largeContainer-45",
    "head": "Component-head-46",
    "tableRoot": "Component-tableRoot-47 Component-tableRoot-250",
    "tableHeader": "Component-tableHeader-48",
    "headIcon": "Component-headIcon-49",
    "inactiveColumn": "Component-inactiveColumn-50",
    "activeColumn": "Component-activeColumn-51",
    "rowRoot": "Component-rowRoot-52",
    "disableIcon": "Component-disableIcon-53",
    "customScrollbar": "Component-customScrollbar-54"
  },
  "rowIndex": 0,
  "row": {
    "id": 211,
    "uid": "1uRQ2faWcebaLO1jHQtHFP3ZoQ2",
    "emp_id": "10091154",
    "name": "Himanshu Pati Tripathi",
    "email": "himanshu.tripathi@telusinternational.com",
    "org_id": 1,
    "business_unit": "Brand, Marketing and Culture Asia",
    "reporting_manager": "Mazin",
    "reporting_manager_email": "mazin.hafeez@telusinternational.com",
    "senior_manager": "Shivani",
    "senior_manager_email": "shreya.agrawal@telusinternational.com",
    "group": "intensive_watch",
    "active": true,
    "created": "2021-06-25T12:55:15.225355Z",
    "created_by": "Syed Mohammad Ali",
    "updated": "2021-08-19T09:37:11.561424Z",
    "updated_by": "Shreya Agrawal",
    "image1": "gs://fdqa-master1/himanshu.tripathi/1.jpg",
    "image2": "",
    "image3": "",
    "username": "himanshu.tripathi",
    "verify_image": true,
    "version": 1,
    "exempted": false,
    "debug": false,
    "wd_data_sync": false,
    "wd_image_sync": false,
    "work_force_manager": " "
  },
  "columns": [
    {
      "label": "Emp ID",
      "dataKey": "emp_id",
      "width": "10%",
      "className": "show-ellipsis uppercase-text",
      "isCollapseIcon": true
    },
    {
      "label": "Emp Name",
      "dataKey": "name",
      "width": "13%",
      "className": "show-ellipsis capitalize",
      "sorting": true
    },
    {
      "label": "Email ID",
      "dataKey": "email",
      "width": "20%",
      "className": "show-ellipsis",
      "sorting": true
    },
    {
      "label": "Group",
      "dataKey": "group",
      "width": "12.5%",
      "sorting": true,
      "className": "capitalize"
    },
    {
      "label": "Manager",
      "dataKey": "reporting_manager",
      "width": "13%",
      "className": "show-ellipsis capitalize",
      "sorting": true
    },
    {
      "label": "Sr. Manager",
      "dataKey": "senior_manager",
      "width": "13%",
      "className": "show-ellipsis capitalize",
      "sorting": true
    },
    {
      "label": "Images(1,2,3)",
      "dataKey": "image",
      "width": "13%",
      "images": [
        "image1",
        "image2",
        "image3"
      ]
    },
    {
      "label": "Action",
      "dataKey": "action",
      "width": "8%"
    }
  ],
  "selectedRow": [],
  "rowBg": "#FFFFFF",
  handleSelectedRow: () => { }
}

test('render  CustomTableCell 1: simple cell render', () => {
  const col = {
    label: 'Emp Name',
    dataKey: 'name',
    width: '13%',
    className: 'show-ellipsis capitalize',
    sorting: true,
  }
  const { getByTestId, getByTitle } = renderWithRouterAndRedux(
    <CustomTableCell col={col} rowData={rowData} />
  );
  expect(getByTestId(`table-cell-${rowData.rowIndex}`)).toBeInTheDocument();
});


test('render  CustomTableCell 2: isDisabled true', () => {
  const col = {
    label: 'Emp Name',
    dataKey: 'name',
    width: '13%',
    className: 'show-ellipsis capitalize',
    sorting: true,
    isDisabled: row => true,
  }
  const { getByTestId, getByTitle } = renderWithRouterAndRedux(
    <CustomTableCell col={col} rowData={rowData} />
  );
  expect(getByTestId(`table-cell-${rowData.rowIndex}`)).toBeInTheDocument();
});


test('render  CustomTableCell 3: checkbox', () => {
  const col = {
    firstCol: true,
    hideCheckbox: false,
    label: 'Emp Name',
    dataKey: 'name',
    width: '13%',
    className: 'show-ellipsis capitalize',
    sorting: true,
  }
  rowData.selectedRow.push(rowData.row)
  const { getByTestId, getByTitle } = renderWithRouterAndRedux(
    <CustomTableCell col={col} rowData={rowData} />
  );
  expect(getByTestId(`table-cell-${rowData.rowIndex}`)).toBeInTheDocument();
  const tablecell = getByTestId(`table-cell-${rowData.rowIndex}`);
  expect(tablecell).toBeInTheDocument();
  fireEvent.click(tablecell, { target: {} })

  const cellCheckBox = getByTestId(`checkbox-row`);
  expect(cellCheckBox).toBeInTheDocument();
  fireEvent.click(cellCheckBox, { target: { checked: true } })
});


test('render  CustomTableCell 4: Collapsible row', () => {
  const col = {
    isCollapseIcon: true,
    label: 'Emp Name',
    dataKey: 'name',
    width: '13%',
    className: 'show-ellipsis capitalize',
    sorting: true,
  }
  rowData.isCollapsible = true;
  const { getByTestId, getByTitle } = renderWithRouterAndRedux(
    <CustomTableCell col={col} rowData={rowData} />
  );
  expect(getByTestId(`table-cell-${rowData.rowIndex}`)).toBeInTheDocument();
  expect(getByTestId(`icon-button-${rowData.rowIndex}`)).toBeInTheDocument();
});

test('render  CustomTableCell 4: Collapsible row', () => {
  const col = {
    isCollapseIcon: true,
    label: 'Emp Name',
    dataKey: 'name',
    width: '13%',
    className: 'show-ellipsis capitalize',
    sorting: true,
  }
  rowData.openedRowIndex = 0
  rowData.isCollapsible = true;
  rowData.handleDropdown = () => { }
  const { getByTestId, getByTitle } = renderWithRouterAndRedux(
    <CustomTableCell col={col} rowData={rowData} />
  );
  const iconButton = getByTestId(`icon-button-${rowData.rowIndex}`);
  expect(getByTestId(`table-cell-${rowData.rowIndex}`)).toBeInTheDocument();
  expect(iconButton).toBeInTheDocument();
  fireEvent.click(iconButton);
});
