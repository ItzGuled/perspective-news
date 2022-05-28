//placeholder
import React, { useState } from "react";
import { searchNews, getHeadlines } from "../utils/API";
import { format_date, timeSince } from "../utils/helpers";
// import "bootstrap/dist/js/bootstrap.bundle.min";
// import "bootstrap/dist/css/bootstrap.min.css";
import "./pages.css";

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
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const { articles } = await response.json();
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

  return (
    <div id="search-div">
      <form id="search-form">
        <h2>Search for news</h2> 
        <section>
        <input
          type="text"
          name="searchText"
          id="searchText"
          value={searchString}
          onChange={(e) => setSearchString(e.target.value)}
          placeholder="...type here to search for news" />
       
        <button onClick={searchForNews} type="submit">Search</button>
        <button onClick={topHeadlines}  type="submit">Headlines</button>
        </section>
      </form>
 <section id="search-output">
      {news.map((item, i) => {
        return (
          <div id="search-output-div" key={i}>
            <div className="headline">
            <img
            src={item.urlToImage}
            alt=""
            width="150px"
            className="headline-img"
          />
              <div id="search-items">
                <a href={item.url}>
                  <h3 id="item-title">{item.title}</h3>
                </a>
                <p id="item-description">{item.description}</p>
                <div id="item-source">
                  {item.source.name || ""}|{format_date(item.publishedAt)}{" "}
                  {timeSince(item.publishedAt)}{" "}
                </div>
                <p id="button-wrapper">
                <button id="save-search">Save</button>
                </p>
              </div>
            </div>
          </div>
        
        );
      })}  </section>
    </div>
  );
};

export default Search;