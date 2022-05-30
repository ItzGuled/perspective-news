/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import "../pages/pages.css";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignupForm";
import Auth from "../utils/auth";

function Nav(props) {
  const { option, setOption } = props;
  const [newUser, setNewUser] = useState(false)
  
  return (
    <div>
      <nav className="navbar">
        <ul>
          <li>
            <a
              href="/"
              onClick={() => setOption("Search News")}
              className={
                option === "Search News" ? "nav-link active" : "nav-link"
              }
            >
              Search News
            </a>
          </li>
          {Auth.loggedIn() && (
            <li>
              <a
                href="/saved"
                onClick={() => setOption("Your News")}
                className={
                  option === "Your News" ? "nav-link active" : "nav-link"
                }
              >
                Your News
              </a>
            </li>
          )}
          {!Auth.loggedIn() && !newUser &&(<LoginForm setNewUser={setNewUser} />)}
          {!Auth.loggedIn() && newUser && (<SignUpForm setNewUser={setNewUser} />)}
        </ul>
      </nav>
    </div>
  );
}

export default Nav;
