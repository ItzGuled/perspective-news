
export const searchNews = (searchOptions => {
    const apiKey = '58ff07ddb2ee4cbaa56658a9724bb614'
    const { searchString, from, to} = searchOptions


    // const tempOptions = 'q=tesla&from=2022-04-25&sortBy=publishedAt'
    const apiUrl = `https://newsapi.org/v2/everything?q=${searchString}&apiKey=${apiKey}`
    return fetch(apiUrl)
  });
  
  