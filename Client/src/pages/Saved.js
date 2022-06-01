import "./pages.css";
import React from "react";
import { useQuery } from "@apollo/react-hooks";

// import { getMe, deleteBook } from '../utils/API';
import Auth from "../utils/auth";
import { GET_ME } from "../utils/queries";
import NewsList from "../components/NewsList";
import { usersSavedNews } from "../utils/helpers";

const SavedNews = () => {
  
  // Makes sure user is logged in before getting data
  if (!Auth.loggedIn) { window.location = "/"}

  // Gets the logged in user's data
  const { data: user, loading } = useQuery(GET_ME);

  console.log(user)
  // Displays if delay in loading data
  if (loading) {
    return <h2>Loading your news...</h2>;
  }
  
  // Sets the news variable to the users' save news, if none it just returns an empty array
  const news = user?.me?.savedNews || [];

    return (
    <>
      <h3>{usersSavedNews(user.me)}</h3>
      <NewsList news={news} />
    </>
  );
};

export default SavedNews;


