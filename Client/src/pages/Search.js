//placeholder
import React, { useState } from "react";
import { searchNews, getHeadlines } from "../utils/API";
// import { format_date, timeSince } from "../utils/helpers";
// import "bootstrap/dist/js/bootstrap.bundle.min";
// import "bootstrap/dist/css/bootstrap.min.css";
// import Auth from '../utils/auth'

import "./pages.css";
import NewsList from "../components/NewsList";
import { SAVE_NEWS } from "../utils/mutations";
import { useMutation } from "@apollo/client";

const Search = () => {

  // State objects for the news articles and search string
  const [news, updateNews] = useState([]);
  const [searchString, setSearchString] = useState("");
  const [saveNews, {error}] = useMutation(SAVE_NEWS);

  // Gets the top headlines from the RESTful API
  const topHeadlines = async (event) => {
    event.preventDefault();

    try {
      const searchOptions = {};
      const response = await getHeadlines(searchOptions);
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const { articles } = await response.json();
      // console.log(articles[0].content)
      updateNews(articles);
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
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const { articles } = await response.json();
      updateNews(articles);
      console.log(articles);
    } catch (err) {
      console.log(err);
    }

    setSearchString("");
  };

  const handleSaveNews = async (article) => {

    try {
      const { data } = await saveNews({
        variables: { input: {...article} }
      });

      console.log(data);

      if(!data) {
        console.log("Data wasn't saved successfully");
      }
    }
    catch(err) {
      console.error(err);
    }
    
  }

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
          placeholder="Search Perspective..." />

        <button onClick={searchForNews} type="submit">Search</button>
        <button onClick={topHeadlines}  type="submit">Headlines</button>
        </section>
      </form>
      <NewsList news={news} handleSaveNews={handleSaveNews}/>      
    </div>
  );
};

export default Search;