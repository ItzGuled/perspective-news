import "./App.css";
import React, { useState, useEffect } from "react";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import Nav from "./components/Navbar";
import Search from "./pages/Search";

function App() {

  const [nav] = useState(["Search News", "Your News"]);
  const [option, setOption] = useState(nav[0]);

  const navOption = (page) => setOption(page);

  useEffect(() => {
    document.title = `perspective - ${option}`;
  });


  return (
    <div>
      <Header />
      <Nav navOption={navOption} option={option} setOption={setOption}>
        option={option}
      </Nav>
      {option === "Search News" && <Search />}
      {option === "Your News" && <single />}
      <Footer />
    </div>
  );
}

export default App;
