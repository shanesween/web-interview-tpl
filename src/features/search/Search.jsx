import React, {useState} from 'react';
import debounce from 'lodash.debounce';
import SearchForm from './SearchForm';
import SearchResults from './SearchResults';
import styles from './Search.module.css';

const Search = () => {
  const [searchValue, setSearchValue] = useState(null);
  
  const handleSearch = debounce(search => {
    setSearchValue(search);
  }, 500);

  return (
    <div className={styles.moduleContainer}>
      <SearchForm handleSearch={handleSearch} />
      <SearchResults searchValue={searchValue} />
    </div>
  )
}

export default Search