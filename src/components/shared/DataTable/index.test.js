import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect';
import DataTable from './index';
import renderWithRouterAndRedux from 'utils/testUtils';
// import editIcon from 'assets/images/timon.png'


const rowIndex = 0;

const rows = [{
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
{
    "id": 21,
    "uid": "1uRQ2faWcebaLO1jHQtHFP3ZoQ7",
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
}]
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
const tableConfig = {
    sortOrder: 'desc',
    sortBy: 'capture',
    page: 1,
    size: 10,
}
test('render  DataTable 1:', () => {
    const { getByTestId, getAllByTestId } = renderWithRouterAndRedux(
        <DataTable
            rows={rows}
            columns={columns}
            handleOnClick={() => { }}
            handleSorting={() => { }}
            handleActions={() => { }}
        />
    );
    expect(getByTestId(`table-root`)).toBeInTheDocument();
    // expect(getAllByTestId(`table-cell-${rowIndex}`)).toHaveLength(columns.length);
});

test('render  DataTable 1:', () => {
    const { getByTestId, getAllByTestId } = renderWithRouterAndRedux(
        <DataTable
            rows={rows}
            columns={columns}
            initialSorting={tableConfig}
            handleOnClick={() => { }}
            handleSorting={() => { }}
            handleActions={() => { }}
        />
    );
    const tableSort = getAllByTestId(`table-sort`);
    expect(getByTestId(`table-root`)).toBeInTheDocument();
    expect(tableSort).toHaveLength(columns.filter((obj) => obj.sorting).length);
    tableSort.map((node) => {
        fireEvent.click(node)
    })
});

test('render  DataTable 1:', () => {
    columns.unshift({
        label: "#",
        dataKey: "id",
        width: "5%",
        firstCol: true
    })
    const { getByTestId, getAllByTestId } = renderWithRouterAndRedux(
        <DataTable
            rows={rows}
            columns={columns}
            initialSorting={tableConfig}
            handleOnClick={() => { }}
            handleSorting={() => { }}
            handleActions={() => { }}
            isModified={true}
        />
    );

    const checkboxRow = getAllByTestId(`checkbox-row`);
    expect(checkboxRow).toHaveLength(rows.length)
    const node = checkboxRow[0]
    expect(node).toBeInTheDocument()
    fireEvent.click(node)
    fireEvent.click(node)
    // checkboxRow.map((node) => {
    //     expect(node).toBeInTheDocument()
    //     fireEvent.click(node)
    //     fireEvent.click(node)
    // })

    const checkboxHeader = getByTestId(`checkbox-header`);
    // expect(checkboxHeader).toHaveLength(rows.length)
    // const node = checkboxHeader
    expect(checkboxHeader).toBeInTheDocument()
    fireEvent.click(checkboxHeader)
    // fireEvent.click(checkboxHeader)
});