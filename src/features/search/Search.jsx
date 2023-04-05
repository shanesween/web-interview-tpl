import React, {useState} from 'react';
import SearchForm from './SearchForm';
import SearchResults from './SearchResults';
import styles from './Search.module.css';

const Search = () => {
  const [searchValue, setSearchValue] = useState(null);
  
  return (
    <div className={styles.moduleContainer}>
      {/* Renders a form component for users to enter search queries */}
      <SearchForm onSearch={setSearchValue} />
      {/* Renders the search results based on the user's search query */}
      <SearchResults searchValue={searchValue} />
    </div>
  )
}

export default Search