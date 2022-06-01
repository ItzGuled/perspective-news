import React, { useState, useEffect } from "react";
import Auth from "../../utils/auth";
import { byline } from "../../utils/helpers";
import { SAVE_NEWS, REMOVE_NEWS } from "../../utils/mutations";
import { useMutation } from "@apollo/client";

const NewsList = ({ news }) => {
  
  const [saveNews] = useMutation(SAVE_NEWS);
  const [removeNews] = useMutation(REMOVE_NEWS)

  const removeArticle = async (itemId) => {
    try {
      const { data, error } = await removeNews({ variables: { newsId: itemId }});
      if (error) { console.log("New wasn't removed successfully")};
      window.location.reload(false)
    } 
    catch (err) {
      console.error(err);
    }
  }

  const saveArticle = async (item) => {
    try {
      const { data, error } = await saveNews({ variables: { input:{...item}}});
      if (error) { console.log("Data wasn't saved successfully")};
    } 
    catch (err) {
      console.error(err);
    }
  };

  const convertData = (item) => {
    
    if(!item._id) {
      // unsaved news article
      return {
        sourceId: item.source.id,
        sourceName: item.source.name,
        author: item.author,
        title: item.title,
        description: item.description,
        url: item.url,
        image: item.urlToImage,
        publishedAt: item.publishedAt,
        content: item.content,
      }
    }
    // saved news article
    else {
      return {...item}
    }
  }

  return (
    <section id="search-output">
      {news.map((item, i) => {
        const data = convertData(item);
        return (
          <div id="search-output-div" key={i}>
            <div className="headline">
              <img
                src={data.image}
                alt=""
                width="150px"
                className="headline-img"
              />
              <div id="search-items">
                <a href={data.url}>
                  <h3 id="item-title">{data.title}</h3>
                </a>
                <p id="item-description">{data.description}</p>
                <div id="item-source">{byline(data)}</div>
                {Auth.loggedIn() && (
                  <p id="button-wrapper">
                    {!data._id && <button id="save-search" onClick={() => saveArticle(data)}>Save</button>}
                    {data._id && <button id="save-search" onClick={() => removeArticle(data._id)}>Remove</button>}
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
