import React from 'react';
import SearchResult from './SearchResult';
import styles from './Search.module.css';
import useSearchQuery from './useSearchQuery';
import useSortedResults from './useSortedResults';

const SearchResults = ({searchValue}) => {

  const {isLoading, error, data, isFetched} = useSearchQuery({searchValue});
  const results = useSortedResults(data);

  const renderLoading = () => <p>Loading...</p>;
  const renderError = () => <p>Error: {error.message}</p>;
  const renderNoResults = () => <p>No results found.</p>;
  const renderResults = () => (
    <div className={styles.container}>
      {results.map((result) => (
        <SearchResult result={result} />
      ))}
    </div>
  );

  if (!isFetched) return null;
  if (isLoading) return renderLoading();
  if (error) return renderError();
  if (results.length) return renderResults();
  return renderNoResults();
}

export default SearchResults