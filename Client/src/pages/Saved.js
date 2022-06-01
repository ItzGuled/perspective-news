import "./pages.css";
import React from "react";
import { useQuery } from "@apollo/react-hooks";

// import { getMe, deleteBook } from '../utils/API';
import Auth from "../utils/auth";
import { GET_ME } from "../utils/queries";
import { REMOVE_NEWS } from "../utils/mutations";
import NewsList from "../components/NewsList";

const SavedNews = () => {
  const { data: user, loading } = useQuery(GET_ME);

  if (loading) {
    return <h2>LOADING...</h2>;
  }
  
  const news = user?.me?.savedNews || [];
  console.log(news)

  return (
    <div>
    <h1>Your News</h1>
    <NewsList news={news} />
    </div>
  );
};

export default SavedNews;


