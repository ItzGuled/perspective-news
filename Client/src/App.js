import "./App.css";
import React, { useState, useEffect } from "react";
import { searchNews, getHeadlines } from "./utils/API.js";
import { format_date, timeSince } from "./utils/helpers";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Nav from "./components/Navbar";

function App() {
  const [news, updateNews] = useState([]);
  const [searchString, setSearchString] = useState("");
  
  const topHeadlines = async (event) => {
    event.preventDefault();

    try {
      const searchOptions = { };
      const response = await getHeadlines(searchOptions);
      if(!response.ok) {
        throw new Error("Something went wrong!");
      }
      const { articles } = await response.json();
      updateNews(articles);
    } catch(err) {
      console.log(err);
    }
  const [nav] = useState(["Search News", "Your News"]);

  const [option, setOption] = useState(nav[0]);

  useEffect(() => {
    document.title = `perspective - ${option}`;
  });
  const navOption = (page) => setOption(page);

    setSearchString('')
  }
  
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

    setSearchString('')
  
  };

  return (
    <div>
      <Header />
      <Nav navOption={navOption} option={option} setOption={setOption}>
        option={option}
      </Nav>
      {option === "Search News" && <search />}
      {option === "Your News" && <single />}
      <form>
        <h2>Search for news</h2>
        <input
          type="text"
          name="searchText"
          id="seartchText"
          value={searchString}
          onChange={(e) => setSearchString(e.target.value)}
          placeholder="Search for news"
        />
        <button onClick={searchForNews}>Search</button>
        <button onClick={topHeadlines}>Headlines</button>
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
