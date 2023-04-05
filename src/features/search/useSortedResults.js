import {useEffect, useState} from 'react';
import {sortResults} from './searchUtils';


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