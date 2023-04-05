const apiUrl = 'https://mobile-staging.gametime.co/v1/search?q=';

/**
 * @fetchSearch
 * This function makes a network request to fetch the search results 
 * from a given API URL based on the provided search value.
 * 
 * @param searchValue (required): A string representing the search value 
 * entered by the user.
 * 
 * @returns A Promise that resolves to the data fetched from the API in the form of an object.
 */
export const fetchSearch = async (searchValue) => {
  try {
    if (searchValue) {
      const res = await fetch(apiUrl + searchValue);
      const data = await res.json();
      return data;
    }
  } catch (error) {
    console.error('Error fetching search results:', error);
    throw error;
  }
};