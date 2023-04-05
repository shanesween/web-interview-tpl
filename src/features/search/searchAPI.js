const apiUrl = 'https://mobile-staging.gametime.co/v1/search?q=';

export const fetchSearch = async (searchValue) => {
  if (searchValue) {
    const res = await fetch(apiUrl + searchValue);
    const data = await res.json();
    return data;
  }
};