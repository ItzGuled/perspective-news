/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import "../pages/pages.css";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignupForm";
import Auth from "../utils/auth";

function Nav() {
  const [pages] = useState(["Search News", "Your News"])
  const [currentPage, setCurrentPage] = useState();
  const [newUser, setNewUser] = useState(false);

  return (
    <div>
      <nav className="navbar">
        <ul>
          <li>
            <a
              href="/"
              onClick={() => setCurrentPage(pages[0])}
              className={
                currentPage === pages[0] ? "nav-link active" : "nav-link"
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
                  onClick={() => setCurrentPage(pages[1])}
                  className={
                    currentPage === pages[1] ? "nav-link active" : "nav-link"
                  }
                >
                  Your News
                </a>
              </li>
              <li>
                <a
                  href="/"
                  onClick={() => Auth.logout()}
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
