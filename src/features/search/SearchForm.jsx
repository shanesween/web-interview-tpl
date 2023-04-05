import React from 'react';
import {BsSearch} from 'react-icons/bs';


const SearchForm = ({handleSearch}) => {

  return (
    <div className="input-container">
      <span>
        <BsSearch className="icon" />
      </span>
      <input
        type="text"
        name="search"
        className="input"
        onChange={event => handleSearch(event.target.value)}
      />
    </div>
  );
}

export default SearchForm