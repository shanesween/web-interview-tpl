import {useQuery} from '@tanstack/react-query';
import {fetchSearch} from './searchAPI';

/**
 * @useSearchQuery
 * A custom hook that uses useQuery from the @tanstack/react-query library
 * to fetch search results from an API endpoint using the fetchSearch function
 * 
 * @param searchValue - The value used to search for results.
 * 
 * @returns A useQuery object that contains the status of the API request
 * and the data returned from the API.
 */
const useSearchQuery = ({
  searchValue
}) => {
  return useQuery(
    ['search', searchValue],
    () => searchValue && fetchSearch(searchValue),
    {enabled: !!searchValue}
  );
}

export default useSearchQuery