import React from "react";
import Auth from "../../utils/auth";
import { format_date, timeSince } from "../../utils/helpers";


const NewsList = ({news, handleDeleteNews, handleSaveNews}) => {
    


    return(
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
                    </div>
                    </div>
                    {Auth.loggedIn() && (
                    <p id="button-wrapper">                        
                    <button data-testid={item._id? item._id : ''} id="save-search" onClick={item._id? handleDeleteNews(item._id) : handleSaveNews(item)}>{item._id? 'Delete' : 'Save'}</button>
                    </p>
                    )}
                </div>                
                );
            })}  
        </section>
    )
}

export default NewsList;