import React from 'react';
import debounce from 'lodash.debounce';
import {BsSearch} from 'react-icons/bs';

const SearchForm = ({onSearch}) => {

  const handleSearch = debounce(({target: {value}}) => {
    onSearch(value);
  }, 500);

  return (
    <div className="input-container">
      <span>
        <BsSearch className="icon" />
      </span>
      <input
        type="text"
        name="search"
        className="input"
        onChange={handleSearch}
      />
    </div>
  )
};

export default SearchForm