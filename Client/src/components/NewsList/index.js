import React, { useState } from "react";
import Auth from "../../utils/auth";
import { format_date, timeSince } from "../../utils/helpers";
import { SAVE_NEWS } from "../../utils/mutations";
import { useMutation } from "@apollo/client";

const NewsList = ({ news }) => {

    const [saveNews] = useMutation(SAVE_NEWS);
    const [article, setArticle] = useState('')

    const handleDeleteNews = async (event) => {


    };

    const handleSaveNews = async (event) => {
      
        try {
          const { data } = await saveNews({
            variables: { input: {...article} }
          });
    
          if(!data) {
            console.log("Data wasn't saved successfully");
          }
        }
        catch(err) {
          console.error(err);
        }
        
      }



  return (
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
                {Auth.loggedIn() && (
                  <p id="button-wrapper">
                    <button
                      id="save-search"
                      onClick={(event) => {
                        setArticle(item)
                        handleSaveNews(event)
                    }}
                    >
                     Test
                    </button>
                  </p>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default NewsList;
