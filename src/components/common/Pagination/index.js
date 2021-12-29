import React, { Fragment } from 'react';
import Pagination from 'react-js-pagination';
import './index.scss';
import NoDataComp from 'components/common/NoDataComp';
import SelectMenu from 'components/common/SelectMenu';

const options = [
  { label: '10', value: 10 },
  { label: '15', value: 15 },
  { label: '20', value: 20 },
  { label: '25', value: 25 },
  { label: '30', value: 30 },
];

const CustomPagination = props => {
  const {
    totalItemsCount = 0,
    pageRangeDisplayed = 5,
    activePage,
    itemsCountPerPage = 10,
    isHidePaginationDropdown,
    setActivePage,
    setItemsPerPage,
    rows,
  } = props;
  let showPagination =
    itemsCountPerPage < totalItemsCount || !isHidePaginationDropdown;
  if (!totalItemsCount) {
    return (
      <div className="no-data">
        <NoDataComp msgHeading="No record to display." />
      </div>
    );
  }
  const screenWidth = window.screen.width
  let displayPageRange = pageRangeDisplayed;
  if (screenWidth < 350) {
    displayPageRange = pageRangeDisplayed > 3 ? 3 : pageRangeDisplayed
  } else if (screenWidth < 375) {
    displayPageRange = pageRangeDisplayed > 4 ? 4 : pageRangeDisplayed
  }
  return (
    <div className="pagination-root" id="pagination-root">
      <div className="pagination-section" data-testid="active-link">
        {showPagination && (
          <Pagination
            firstPageText="First"
            lastPageText="Last"
            prevPageText={<i className="fas fa-arrow-left"></i>}
            nextPageText={<i className="fas fa-arrow-right"></i>}
            itemClass="itemClass"
            linkClass="linkClass"
            linkClassPrev="linkClassPrev"
            linkClassNext="linkClassNext"
            itemClassFirst="itemClassFirst"
            itemClassLast="itemClassLast"
            activeLinkClass="activeLinkClass"
            pageRangeDisplayed={displayPageRange}
            activePage={activePage}
            itemsCountPerPage={itemsCountPerPage}
            totalItemsCount={totalItemsCount}
            onChange={setActivePage}
          />
        )}
      </div>
      <div className="d-flex pagination-content-wrapper">
        {showPagination && (
          <div className="result-count">
            Showing {(activePage - 1) * itemsCountPerPage + 1} to{' '}
            {(activePage - 1) * itemsCountPerPage + (rows || []).length} of{' '}
            {totalItemsCount} Records{' '}
          </div>
        )}

        {showPagination && (
          <div className="item-per-page-wrapper">
            {!isHidePaginationDropdown && (
              <Fragment>
                <span className="divider"> | </span>
                <span>Rows Per Page</span>
                <div className="show-pagination-dropdown">
                  <SelectMenu
                    selectedOption={itemsCountPerPage}
                    onDropdownChange={setItemsPerPage}
                    options={options}
                    placeholder={'Select'}
                    search={false}
                    type="pagination-dropdown"
                    readOnly={true}
                  />
                </div>
              </Fragment>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomPagination;
