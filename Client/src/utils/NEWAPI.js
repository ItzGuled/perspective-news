// /* eslint-disable no-unused-vars */
// export const ApiFunc = async (searchparam) => {
//   const articlesObj = await fetch(
//     `https://gnews.io/api/v4/search?q=${searchparam}&max=10&lang=en&country=us&token=4d43b1331880fabca105f81e9403daf2`
//   ).then((response) => response.json());

//   console.log("line 6", articlesObj);
//   const articlesArr = articlesObj.articles;
//   console.log("line 8", articlesArr);
//   console.log("line 9", articlesArr instanceof Array);

//   const filteredTitles = (articlesArr, searchParam) => {
//     const titles = articlesArr.map((article) => article.title);
//     console.log("line 14", titles);

//     const filterDuplicates = articlesArr.filter(
//       ({ title }, index) => !titles.includes(title, index + 1)
//     );

//     const filterBySearch = filterDuplicates.filter(({ title }) =>
//       title.includes(searchparam)
//     );

//     console.log("filtered by duplicates", filterDuplicates);
//     console.log("filterBySearch", filterBySearch);
//   };

//   filteredTitles(articlesArr, searchparam);
// };

// let candy = "Tesla";
// ApiFunc(candy);


// import axios from 'axios';
// export const searchNews = (searchOptions => {

//     const { searchString, newsSources, from, to, sort, numberResults} = searchOptions
//     console.log("searchString", searchOptions)
//     const fromDate = from ? `&from=${from}` : '';
//     const toDate = to ? `&to${to}` : '';
//     const sortBy = sort ? `&sortBy=${sort}` : '';
//     const pageSize = numberResults || numberResults <= 100 ? `&pageSize=${numberResults}` : '&pageSize=18'
//     const sources = newsSources ? `&sources=${newsSources}` : ''
   

//     const params = `${searchString}${sources}${fromDate}${toDate}${sortBy}${pageSize}`
    
//     const apiUrl = `https://gnews.io/api/v4/search?q=${params}&max18&lang=en&country=us&token=4d43b1331880fabca105f81e9403daf2`
// console.log("line 16", apiUrl)
//     return axios.get(apiUrl)
//   });
  
// export const getHeadlines = (searchOptions => {

//   const { searchString, country, from, to, sort, numberResults} = searchOptions

//   const search = searchString ? `q=${searchString}` : '';
//   const fromDate = from ? `&from=${from}` : '';
//   const toDate = to ? `&to${to}` : '';
//   const sortBy = sort ? `&sortBy=${sort}` : '';
//   const pageSize = numberResults || numberResults <= 100 ? `&pageSize=${numberResults}` : '&pageSize=18'
//   const source = country ? `&country=${country}` : '&country=us'


//   const paramString = `${search}${source}${fromDate}${toDate}${sortBy}${pageSize}`
  
//   // removes & from the starting parameter
//   let params;
//   if (paramString.charAt(0) === "&") params = paramString.slice(1);
//   else params = paramString;
//   // console.log(params);

//   const apiUrl = `https://gnews.io/api/v4/top-headlines?lang=en&country=us&token=4d43b1331880fabca105f81e9403daf2`

//   return axios.get(apiUrl)

  
// });
