import React from 'react';
import SearchResult from './SearchResult';
import styles from './Search.module.css';
import useSearchQuery from './useSearchQuery';
import useSortedResults from './useSortedResults';

const SearchResults = ({searchValue}) => {

  const {isLoading, error, data, isFetched} = useSearchQuery({searchValue});
  const results = useSortedResults(data);

  if (!isFetched) return null
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  if (results.length) return (
    <div className={styles.container}>
      {results?.map(result => (
        <SearchResult key={result.id} result={result} />
      ))}
    </div>
  )
}

export default SearchResults