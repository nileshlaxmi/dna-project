import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect';
import CellActions from '../CellActions';
import renderWithRouterAndRedux from 'utils/testUtils';
// import editIcon from 'assets/images/timon.png'
const actions = []
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
const dataKey = "action"

test('render  CellActions: customAction ', () => {
  actions.push({
    "title": "Edit",
    "actionType": "editAction",
    "icon": 'editIcon',
    "width": 20,
    "height": 20,
    "className": "ml-n2",
    customAction: ({ row, handleActions }, item) => {
      return (
        <img
          src={item.editIcon}
          className="disabled"
          title={item.title}
          data-testid="data-actions-custom"
          onClick={handleActions}
        />
      )
    }
  })
  const { getByTestId, getByTitle } = renderWithRouterAndRedux(
    <CellActions actions={actions} rowData={rowData} dataKey={dataKey} />
  );
  expect(getByTestId('data-actions-custom')).toBeInTheDocument();
  fireEvent.click(getByTestId('data-actions-custom'))
});

// test('render  CellActions: toggle', () => {
//   actions.push({
//     "title": "Activate Employee",
//     "actionType": "ActivateEmp",
//     "icon": 'Activate',
//     "width": 20,
//     "height": 20,
//     "className": "ml-3",
//     "isToggle": true,
//     "toggleValue": true,

//   })
//   actions.push({
//     "title": "Deactivate Employee",
//     "actionType": "deboardAction",
//     "icon": 'editIcon',
//     "width": 20,
//     "height": 20,
//     "className": "ml-3",
//     "isToggle": true,
//     "toggleValue": true,
//     "isDisabled": () => true
//   })
//   const { getAllByTestId, getByTitle } = renderWithRouterAndRedux(
//     <CellActions actions={actions} rowData={rowData} dataKey={dataKey} />
//   );
//   expect(getByTitle('Activate Employee')).toBeInTheDocument();
//   expect(getByTitle('Deactivate Employee')).toBeInTheDocument();
//   const switchBtn = getAllByTestId('toggle-action');
//   expect(switchBtn).toHaveLength(2);
//   switchBtn.map((node) => {
//     expect(node).toBeInTheDocument();
//     fireEvent.change(node, { target: { value: '' } })
//   })
// });




test('render  CellActions: Icon action button ', () => {
  actions.push({
    "title": "Edit Employee",
    "actionType": "editEmp",
    "icon": 'EditIcon',
    "width": 20,
    "height": 20,
  })
  actions.push({
    "title": "Edit Employee disabled",
    "actionType": "editEmp",
    "icon": 'EditIcon',
    "width": 20,
    "height": 20,
    "className": "ml-3",
    "isDisabled": () => true
  })
  const { getAllByTestId, getByTestId, getByTitle } = renderWithRouterAndRedux(
    <CellActions actions={actions} rowData={rowData} dataKey={dataKey} />
  );
  expect(getByTitle('Edit Employee')).toBeInTheDocument();
  const iconActions = getAllByTestId('icon-action-btn');
  expect(iconActions).toHaveLength(2);
  iconActions.map((node) => {
    expect(node).toBeInTheDocument();
    fireEvent.click(node);
  })
});




test('render  CellActions: Icon action button ', () => {
  actions.push({
    "title": "Link action",
    "actionType": "link",
    "width": 20,
    "height": 20,
    "className": "ml-3",
  })
  // actions.push({
  //   "title": "Edit Employee disabled",
  //   "actionType": "editEmp",
  //   "icon": 'EditIcon',
  //   "width": 20,
  //   "height": 20,
  //   "className": "ml-3",
  //   "isDisabled": () => true
  // })
  const { getAllByTestId, getByTestId, getByTitle } = renderWithRouterAndRedux(
    <CellActions actions={actions} rowData={rowData} dataKey={dataKey} />
  );
  const iconActions = getByTestId('link-actions-btn');
  expect(iconActions).toBeInTheDocument();
  fireEvent.click(iconActions);
});


