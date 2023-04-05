import {useQuery} from '@tanstack/react-query';
import {fetchSearch} from './searchAPI';

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