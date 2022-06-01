/* eslint-disable no-unused-vars */
import { searchNews, getHeadlines } from "../utils/API";
import { format_date, timeSince } from "../utils/helpers";

import "./pages.css";

import React from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";

// import { getMe, deleteBook } from '../utils/API';
import Auth from "../utils/auth";
import { removeNewsId, saveNewsIds } from "../utils/localStorage";
import { GET_ME } from "../utils/queries";
import { REMOVE_NEWS } from "../utils/mutations";
import NewsList from "../components/NewsList";

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
  // saveNewsIds(savedNewsIds);

  return (
    <div>
      <h1>Viewing saved news!</h1>
      <NewsList
        news={data.me.savedNews}
        handleDeleteNews={handleDeleteNews}
        handleSaveNews={""}
      />
    </div>
  );
};

export default SavedNews;
