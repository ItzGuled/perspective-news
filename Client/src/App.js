import "./App.css";
import React, { useState } from "react";
import { searchNews } from "./utils/API.js";
import { format_date, timeSince } from "./utils/helpers";
import Footer from "./components/Footer";
import Header from "./components/Header";

function App() {
  const [news, updateNews] = useState([]);
  const [searchString, setSearchString] = useState("");

  const handleFormSubmit = async (event) => {
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
  };

  return (
    <div>
      <Header />
      <form>
        <h2>Search for news</h2>
        <input
          type="text"
          name="searchText"
          id="seartchText"
          onChange={(e) => setSearchString(e.target.value)}
          placeholder="Search for news"
        />
        <button onClick={handleFormSubmit}>Search</button>
      </form>

      {news.map((item, i) => {
        return (
          <div key={i}>
            <div className="headline">
              <img
                src={item.urlToImage}
                alt=""
                width="150px"
                className="headline-img"
              ></img>
              <div>
                <a href={item.url}>
                  <h3>{item.title}</h3>
                </a>
                <p>{item.description}</p>
                <div>
                  {item.source.name || ""}|{format_date(item.publishedAt)}{" "}
                  {timeSince(item.publishedAt)}{" "}
                </div>
                <p></p>
              </div>
            </div>
          </div>
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
