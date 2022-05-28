import React, { useState } from "react";
import { searchNews, getHeadlines } from "../utils/API";
import { format_date, timeSince } from "../utils/helpers";
// import "bootstrap/dist/js/bootstrap.bundle.min";
// import "bootstrap/dist/css/bootstrap.min.css";
import "./pages.css";

const Saved = () => {

  return (
    <div>
     <h1>Your saved news will display here!</h1>
    </div>
  );
};

export default Saved;