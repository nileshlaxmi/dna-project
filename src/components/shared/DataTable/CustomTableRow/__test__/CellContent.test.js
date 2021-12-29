import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect';
import CellContent from '../CellContent';
import renderWithRouterAndRedux from 'utils/testUtils';
// import editIcon from 'assets/images/timon.png'


const rowData = {
  "classes": {
    "root": "Component-root-40",
    "tableCellRoot": "Component-tableCellRoot-41",
    "extraSmallContainer": "Component-extraSmallContainer-42",
    "smallContainer": "Component-smallContainer-43 Component-smallContainer-55",
    "mediumContainer": "Component-mediumContainer-44",
    "largeContainer": "Component-largeContainer-45",
    "head": "Component-head-46",
    "tableRoot": "Component-tableRoot-47 Component-tableRoot-56",
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
    "id": 28,
    "uid": "1hMXsNUN9QY3g3p8xswppAfwsT6",
    "emp_id": "10089991",
    "name": "Răghav",
    "email": "raghav.kaplish01@telusinternational.com",
    "org_id": 1,
    "business_unit": "iLab",
    "reporting_manager": "Atul",
    "reporting_manager_email": "atul.divedi@telusinternational.com",
    "senior_manager": "Amit",
    "senior_manager_email": "akshay.agarwal@telusinternational.com",
    "group": "default",
    "active": true,
    "created": "2020-09-11T11:02:20.138789Z",
    "created_by": "Himanshu",
    "updated": "2021-09-03T10:24:41.96558Z",
    "updated_by": "Nilesh Laxmi",
    "image1": "gs://fdqa-master1/raghav.kaplish01/1.jpg",
    "image2": "",
    "image3": "",
    "username": "raghav.kaplish01",
    "verify_image": true,
    "version": 1,
    "exempted": false,
    "debug": false,
    "wd_data_sync": false,
    "wd_image_sync": false
  },
  handleActions: () => { },
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
  "selectedRow": [
  ],
  "rowBg": "#F7F7F8"
}

test('render  CellContent ', () => {
  const col = {
    label: 'Emp Name',
    dataKey: 'name',
    width: '13%',
    className: 'show-ellipsis capitalize',
    sorting: true,
    isDisabled: row => !row.active,
  }
  const { getByTestId, getByTitle } = renderWithRouterAndRedux(
    <CellContent col={col} rowData={rowData} />
  );
  expect(getByTitle(rowData.row[col.dataKey])).toBeInTheDocument();
  expect(getByTitle(rowData.row[col.dataKey])).toBeInTheDocument();
});

test('render  CellContent: cellData ', () => {
  const col = {
    label: 'Emp ID',
    dataKey: 'emp_id',
    width: '10%',
    className: 'show-ellipsis uppercase-text',
    isCollapseIcon: true,
    cellData: ({ row, handleActions }) => {
      return (
        <a data-testid="cell-data-id" className="hand" onClick={() => handleActions('showEmpInfo', row)}>
          {row.emp_id}
        </a>
      );
    },
    // sorting: true
    isDisabled: row => !row.active,
  }
  const { getByTestId, getByTitle } = renderWithRouterAndRedux(
    <CellContent col={col} rowData={rowData} />
  );
  expect(getByTestId('cell-data-id')).toBeInTheDocument();
  fireEvent.click(getByTestId('cell-data-id'))
});


test('render  CellContent: actionItems ', () => {
  const col = {
    label: 'Action',
    dataKey: 'action',
    width: '10%',
    actionItems: [
      {
        icon: 'deleteIcon',
        width: 20,
        height: 20,
        actionType: 'invalidateInviteToken',
        title: 'Withdraw Invitation',
        className: '',
      }
    ],
  }
  const { getByTestId, getAllByTestId, getByTitle } = renderWithRouterAndRedux(
    <CellContent col={col} rowData={rowData} />
  );

  const iconActions = getAllByTestId('icon-action-btn');
  expect(iconActions).toHaveLength(1);
  iconActions.map((node) => {
    expect(node).toBeInTheDocument();
    fireEvent.click(node);
  })
});

test('render  CellContent: actionItems ', () => {
  const col = {
    label: 'Action',
    dataKey: 'action',
    width: '10%',
    // align: 'center',
    cellProps: {
      // align: 'center',
    },
    conditionalActions: row => {
      return [
        {
          title: 'Retained',
          actionType: '',
          icon: 'retainDisabledIcon',
          width: 22,
          height: 22,
          className: 'action-not-allowed',
        }
      ];
    },
  }
  const { getByTestId, getAllByTestId, getByTitle } = renderWithRouterAndRedux(
    <CellContent col={col} rowData={rowData} />
  );
  const iconActions = getAllByTestId('icon-action-btn');
  expect(iconActions).toHaveLength(1);
  iconActions.map((node) => {
    expect(node).toBeInTheDocument();
    fireEvent.click(node);
  })
});

