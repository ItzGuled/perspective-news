/* eslint-disable no-unused-vars */
import React from "react";
import "../pages/pages.css";
import LoginForm from './LoginForm'

function Nav(props) {
  const { option, setOption } = props;

  return (
    <div>
    <nav className="navbar">
      <ul>
        <li>
          <a
            href="#search"
            onClick={() => setOption("Search News")}
            className={option === "Search News" ? "nav-link active" : "nav-link"}
          >
            Search News
          </a>
        </li>
        <li>
          <a
            href="#saved"
            onClick={() => setOption("Your News")}
            className={option === "Your News" ? "nav-link active" : "nav-link"}
          >
            Your News
          </a>
        </li>
      </ul>
    </nav>
    <LoginForm />
    </div>

  );
}

export default Nav;
