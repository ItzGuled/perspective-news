import axios from 'axios';
export const searchNews = (searchOptions => {

    const { searchString, newsSources, from, to, sort, numberResults} = searchOptions
    
    const fromDate = from ? `&from=${from}` : '';
    const toDate = to ? `&to${to}` : '';
    const sortBy = sort ? `&sortBy=${sort}` : '';
    const pageSize = numberResults || numberResults <= 100 ? `&pageSize=${numberResults}` : '&pageSize=100'
    const sources = newsSources ? `&sources=${newsSources}` : ''
    const apiKey = '&apiKey=58ff07ddb2ee4cbaa56658a9724bb614'

    const params = `${searchString}${sources}${fromDate}${toDate}${sortBy}${pageSize}${apiKey}`
    
    const apiUrl = `https://newsapi.org/v2/everything?q=${params}&apiKey=${apiKey}`

    return axios.get(apiUrl)
  });
  
export const getHeadlines = (searchOptions => {

  const { searchString, country, from, to, sort, numberResults} = searchOptions

  const search = searchString ? `q=${searchString}` : '';
  const fromDate = from ? `&from=${from}` : '';
  const toDate = to ? `&to${to}` : '';
  const sortBy = sort ? `&sortBy=${sort}` : '';
  const pageSize = numberResults || numberResults <= 100 ? `&pageSize=${numberResults}` : '&pageSize=100'
  const source = country ? `&country=${country}` : '&country=us'
  const apiKey = '&apiKey=58ff07ddb2ee4cbaa56658a9724bb614'

  const paramString = `${search}${source}${fromDate}${toDate}${sortBy}${pageSize}${apiKey}`
  
  // removes & from the starting parameter
  let params;
  if (paramString.charAt(0) === "&") params = paramString.slice(1);
  else params = paramString;
  // console.log(params);

  const apiUrl = `https://newsapi.org/v2/top-headlines?${params}`

  return axios.get(apiUrl)

  
});
