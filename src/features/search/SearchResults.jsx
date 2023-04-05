import React, {useEffect, useState} from 'react';
import {useQuery} from '@tanstack/react-query';
import SearchResult from './SearchResult';
import {sortResults} from './searchUtils';
import styles from './Search.module.css';


const apiUrl = 'https://mobile-staging.gametime.co/v1/search?q=';

const SearchResults = ({searchValue}) => {
  const {isLoading, error, data, isSuccess} = useQuery(['search', searchValue], () =>
    searchValue && fetch(apiUrl + searchValue).then(res => res.json())
  );

  const [results, setResults] = useState([])

  useEffect(() => {
    if (data && isSuccess) {
      setResults(sortResults(data))
    }
  }, [data, isSuccess])

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