//placeholder
import React, { useState } from "react";
import { searchNews, getHeadlines } from "../utils/API";
// import { format_date, timeSince } from "../utils/helpers";
// import "bootstrap/dist/js/bootstrap.bundle.min";
// import "bootstrap/dist/css/bootstrap.min.css";
// import Auth from '../utils/auth'

import "./pages.css";
import NewsList from "../components/NewsList";

const Search = () => {
  // State objects for the news articles and search string
  const [news, updateNews] = useState([]);
  const [searchString, setSearchString] = useState("");

  // Gets the top headlines from the RESTful API
  const topHeadlines = async (event) => {
    event.preventDefault();

    try {
      const searchOptions = {};
      const response = await getHeadlines(searchOptions);
      

      // if (!response.ok) {
      //   throw new Error("Something went wrong!");
      // }
      // const articles = await response.json();
      // console.log(articles[0].content)
      updateNews(response.data.articles);
    } catch (err) {
      console.log(err);
    }

    setSearchString("");
  };

  // Gets the returned articles based on what's in the searchstirng
  const searchForNews = async (event) => {
    event.preventDefault();

    if (!searchString) {
      return false;
    }

    try {
      const searchOptions = { searchString };
      const response = await searchNews(searchOptions);
      // if (!response.ok) {
      //   throw new Error("Something went wrong!");
      // }

      // const { articles } = await response.json();
      updateNews(response.data.articles);
      console.log(response.data.articles);
    } catch (err) {
      console.log(err);
    }

    setSearchString("");
  };

  return (
    <div id="search-div">
      <form id="search-form">
        <h2>Search for News</h2>
        <section>
          <input
            type="text"
            name="searchText"
            id="searchText"
            value={searchString}
            onChange={(e) => setSearchString(e.target.value)}
            placeholder="Search Perspective..."
          />

          <button onClick={searchForNews} type="submit">
            Search
          </button>
          <button onClick={topHeadlines} type="submit">
            Headlines
          </button>
        </section>
      </form>
      <NewsList news={news} />      
    </div>
  );
};

export default Search;
