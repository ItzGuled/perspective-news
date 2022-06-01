/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import "../pages/pages.css";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignupForm";
import Auth from "../utils/auth";

function Nav() {
  const [newUser, setNewUser] = useState(false);

  const [currentPage, setCurrentPage] = useState(localStorage.getItem('page') || "Search News")

  function changePageTo(page) {
    localStorage.setItem('page', page)
    setCurrentPage(page)
  }

  return (
    <div>
      <nav className="navbar">
        <ul>
          <li>
            <a
              href="/"
              onClick={() => changePageTo("Search News")}
              className={
                currentPage === "Search News" ? "nav-link active" : "nav-link"
              }
            >
              Search News
            </a>
          </li>
          {Auth.loggedIn() && (
            <>
              <li>
                <a
                  href="/saved"
                  onClick={() => changePageTo("Your News")}
                  className={
                    currentPage === "Your News" ? "nav-link active" : "nav-link"
                  }
                >
                  Your News
                </a>
              </li>
              <li>
                <a
                  href="/"
                  onClick={() => {
                    Auth.logout()
                    changePageTo("Search News")
                  }}
                  className={"nav-link"}
                >
                  Logout
                </a>
              </li>
            </>
          )}
          {!Auth.loggedIn() && !newUser && (
            <LoginForm setNewUser={setNewUser} />
          )}
          {!Auth.loggedIn() && newUser && (
            <SignUpForm setNewUser={setNewUser} />
          )}
        </ul>
      </nav>
    </div>
  );
}

export default Nav;
