// import React, { useState } from "react";
import { searchNews, getHeadlines } from "../utils/API";
import { format_date, timeSince } from "../utils/helpers";
// import "bootstrap/dist/js/bootstrap.bundle.min";
// import "bootstrap/dist/css/bootstrap.min.css";
import "./pages.css";

// const Saved = () => {

//   return (
//     <div>
//      <h1>Your saved news will display here!</h1>
//     </div>
//   );
// };

import React from "react";
// import {
//   Jumbotron,
//   Container,
//   CardColumns,
//   Card,
//   Button,
// } from "react-bootstrap";
import { useQuery, useMutation } from "@apollo/react-hooks";

// import { getMe, deleteBook } from '../utils/API';
import Auth from "../utils/auth";
import { removeNewsId, saveNewsIds } from "../utils/localStorage";
import { GET_ME } from "../utils/queries";
import { REMOVE_NEWS } from "../utils/mutations";

const SavedNews = () => {
  const { loading, data } = useQuery(GET_ME);
  const userData = data?.me || [];

  const [removeNews, { error }] = useMutation(REMOVE_NEWS);

  // create function that accepts the book's mongo _id value as param and deletes the book from the database
  const handleDeleteNews = async (newsId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) {
      return false;
    }
    try {
      const response = await removeNews(newsId, token);

      if (!response.ok) {
        throw new Error("something went wrong!");
      }

      //   const updatedUser = await response.json();
      //  setUserData(updatedUser);
      // upon success, remove book's id from localStorage
      removeNewsId(newsId);
    } catch (err) {
      console.error(error);
    }
  };

  // if data isn't here yet, say so
  if (loading) {
    return <h2>LOADING...</h2>;
  }

  const savedNewsIds = userData.savedNews.map((news) => news.newsId);
  saveNewsIds(savedNewsIds);

  return (
    <>
        <h1>Viewing saved news!</h1>
        <h2>
          {userData.savedNews.length
            ? `Viewing ${userData.savedNews.length} saved ${
                userData.savedNewss.length === 1 ? "news" : "news"
              }:`
            : "You have no saved news!"}
        </h2>
          {/* {userData.savedNews.map((news) => {
            return (
              <Card key={news.newsId} border="dark">
                {news.image ? (
                  <Card.Img
                    src={news.image}
                    alt={`The cover for ${news.title}`}
                    variant="top"
                  />
                ) : null}
                <Card.Body>
                  <Card.Title>{news.title}</Card.Title>
                  <p className="small">Author: {news.author}</p>
                  <Card.Text>{news.description}</Card.Text>
                  <Button
                    className="btn-block btn-danger"
                    onClick={() => handleDeleteNews(news.newsId)}
                  >
                    Delete this News Article!
                  </Button>
                </Card.Body>
              </Card>
            );
          })} */}
    </>
  );
};

export default SavedNews;

// export default Saved;
