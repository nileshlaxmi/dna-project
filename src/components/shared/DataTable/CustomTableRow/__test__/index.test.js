import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect';
import CustomTableRow from '../index';
import renderWithRouterAndRedux from 'utils/testUtils';
// import editIcon from 'assets/images/timon.png'


const rowIndex = 0;

const row = {
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
}
const columns = [
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
]
const selectedRow = [];
const rowBg = "#FFFFFF";

test('render  CustomTableRow 1:', () => {
    const { getByTestId, getAllByTestId } = renderWithRouterAndRedux(
        <CustomTableRow
            rowIndex={rowIndex}
            row={row}
            columns={columns}
            rowBg={rowBg}
            selectedRow={selectedRow}
        />
    );
    expect(getByTestId(`table-row-${rowIndex}`)).toBeInTheDocument();
    expect(getAllByTestId(`table-cell-${rowIndex}`)).toHaveLength(columns.length);
});

test('render  CustomTableRow 1:', () => {
    const { getByTestId, getAllByTestId } = renderWithRouterAndRedux(
        <CustomTableRow
            rowIndex={rowIndex}
            row={row}
            rowBg={rowBg}
            selectedRow={selectedRow}
        />
    );
    expect(getByTestId(`table-row-${rowIndex}`)).toBeInTheDocument();
    // expect(getByTestId(`table-cell-${rowIndex}`)).not.toBeInTheDocument();
});


test('render  CustomTableRow 1:', () => {
    const openedRowIndex = 0;
    const isCollapsible = true;
    const collapseContent = <div />
    const { getByTestId, getAllByTestId } = renderWithRouterAndRedux(
        <CustomTableRow
            rowIndex={rowIndex}
            row={row}
            columns={columns}
            rowBg={rowBg}
            selectedRow={selectedRow}
            openedRowIndex={openedRowIndex}
            isCollapsible={isCollapsible}
            collapseContent={collapseContent}
        />
    );
    expect(getByTestId(`table-row-${rowIndex}`)).toBeInTheDocument();
    expect(getByTestId(`table-row-collapsible-${rowIndex}`)).toBeInTheDocument();
    expect(getByTestId(`collapse-data-${rowIndex}`)).toBeInTheDocument();
});

