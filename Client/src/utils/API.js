import axios from 'axios';
export const searchNews = (searchOptions => {

    const { searchString, newsSources, from, to, sort, numberResults} = searchOptions
    console.log("searchString", searchOptions)
    const fromDate = from ? `&from=${from}` : '';
    const toDate = to ? `&to${to}` : '';
    const sortBy = sort ? `&sortBy=${sort}` : '';
    const pageSize = numberResults || numberResults <= 10 ? `&pageSize=${numberResults}` : '&pageSize=18'
    const sources = newsSources ? `&sources=${newsSources}` : ''
   

    const params = `${searchString}${sources}${fromDate}${toDate}${sortBy}${pageSize}`
    
    const apiUrl = `https://gnews.io/api/v4/search?q=${params}&max=9&lang=en&country=us&token=4d43b1331880fabca105f81e9403daf2`
console.log("line 16", apiUrl)
    return axios.get(apiUrl)
  });
  
export const getHeadlines = (searchOptions => {

  const { searchString, country, from, to, sort, numberResults} = searchOptions

  const search = searchString ? `q=${searchString}` : '';
  const fromDate = from ? `&from=${from}` : '';
  const toDate = to ? `&to${to}` : '';
  const sortBy = sort ? `&sortBy=${sort}` : '';
  const pageSize = numberResults || numberResults <= 10 ? `&pageSize=${numberResults}` : '&pageSize=10'
  const source = country ? `&country=${country}` : '&country=us'


  const paramString = `${search}${source}${fromDate}${toDate}${sortBy}${pageSize}`
  
  // removes & from the starting parameter
  let params;
  if (paramString.charAt(0) === "&") params = paramString.slice(1);
  else params = paramString;
  // console.log(params);

  const apiUrl = `https://gnews.io/api/v4/top-headlines?&max=9&lang=en&country=us&token=4d43b1331880fabca105f81e9403daf2`

  return axios.get(apiUrl)

  
});
