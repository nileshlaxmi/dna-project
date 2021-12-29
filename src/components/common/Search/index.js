import React from 'react';
import './index.scss';
// import { errorMessages } from 'constants/errorMessages';
import searchIcon from 'assets/images/search.svg';
import crossIcon from 'assets/images/cross-icon.svg';
import withError from 'utils/errorHoc';

const Search = ({
  onChange,
  searchText = '',
  maxSearchLength = 250,
  placeholder = 'Search',
  handleSubmit,
}) => {
  const handleKeyDown = e => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };
  return (
    <div className={`search-container`}>
      
        <input
          name="query"
          type="text"
          maxLength={maxSearchLength}
          value={searchText}
          onChange={e => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="search-input"
          autoComplete="off"
        />
        <span className="input-grp-pos">
          {!!searchText.length && (
            <span className="reset-icon" onClick={() => onChange('')}>
              <img
                className="reset-img"
                alt="reset"
                title="reset"
                width="16"
                src={crossIcon}
              />
            </span>
          )}
          <span className="search-icon" onClick={handleSubmit}>
            <img
              className="search-img"
              alt="Search"
              title="Search"
              width="20"
              src={searchIcon}
            />
          </span>
        </span>
      {/* {searchText.length > maxSearchLength && (
				<div className='errormessage erroralignment'>
					{errorMessages.maxSearchLength(maximumQueryLength)}
				</div>
			)} */}
    </div>
  );
};

export default withError(Search);
