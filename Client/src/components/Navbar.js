/* eslint-disable no-unused-vars */
import React from "react";

function Nav(props) {
  const { option, setOption, navOption } = props;

  return (
    <nav className="">
      <ul className="">
        <li>
          <a
            href="#search"
            onClick={() => setOption("search")}
            className={option === "search" ?? "nav-link active"}
          >
            Search News
          </a>
        </li>
        <li>
          <a
            href="#single"
            onClick={() => setOption("single")}
            className={option === "single" ?? "nav-link active"}
          >
            Your News
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
