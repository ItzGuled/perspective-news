import React, { useState } from "react";
import { searchNews, getHeadlines } from "../utils/API";
import {ApiFunc} from "../utils/NEWAPI"
import "./pages.css";
import NewsList from "../components/NewsList";

const Search = () => {
  // State objects for the news articles and search string
  const [news, updateNews] = useState([]);
  const [searchString, setSearchString] = useState("");
   // Creates a store for when saving articles so the button will switch to saved
   const [selectedArticles, addSelected] = useState([]);

  // Gets the top headlines from the RESTful API
  const topHeadlines = async (event) => {
    event.preventDefault();

    try {
      // clears the search options so it can make an clear search for the top headlines 
      const searchOptions = {};
      const response = await getHeadlines(searchOptions);
      // if (!response.ok) { throw new Error("Something went wrong!"); }
      // const { articles } = await response.json();
      updateNews(response.data.articles);

      // clears out the selected article indexes
      addSelected([])
    } catch (err) { 
      console.log(err); 
    }
    setSearchString("");
  };

  // Gets the returned articles based on what's in the searchstirng
  const searchForNews = async (event) => {
    event.preventDefault();

    // returns if there is nothing in the search input
    if (!searchString) { return false };

    try {

      // gets the stored state variables
      const searchOptions = { searchString };

      // makes a call to the API to retrieve the news articles
      const response = await searchNews(searchOptions);
      console.log("response", response);
      // if there is an issue with the response information
      // if (!response.ok) { throw new Error("Something went wrong!") };

      // if the response is good, then it gets the articles from the response
      // const { articles } = await response.json();

      // puts the news articles into the useState variables
      updateNews(response.data.articles);

      // clears out the selected articles
      addSelected([])

    } 
    catch (err) {
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
      <NewsList news={news} selectedArticles={selectedArticles} addSelected={addSelected} />      
    </div>
  );
};

export default Search;
