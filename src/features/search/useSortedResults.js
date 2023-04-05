import {useEffect, useState} from 'react';
import {sortResults} from './searchUtils';

/**
 * @useSortedResults 
 * A custom hook that sorts the search results returned by the API. 
 * It takes the data object returned from the API call as its argument
 * and returns a sorted array of results.
 * 
 * @param data An object returned from the API query.
 * 
 * @returns an array of search results sorted by the display group ranking.
 */
const useSortedResults = (data) => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (data) {
      setResults(sortResults(data));
    }
  }, [data]);

  return results;
};

export default useSortedResults