import "./App.css";
import React, { useState, useEffect } from "react";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import Nav from "./components/Navbar";
import Search from "./pages/Search";
import Saved from "./pages/Saved";

function App() {

  const [nav] = useState(["Search News", "Your News", "Login", "Logout"]);
  
  const [option, setOption] = useState(nav[0]);

  const navOption = (page) => {
    page === 'saved' ? setOption(nav[1]) : setOption(nav[0])
  }
 
  useEffect(() => {
    document.title = `perspective - ${option}`;
  });


  return (
    <div>
      <Header />
      <main>
      <Nav navOption={navOption} option={option} setOption={setOption}>
        option={option}
      </Nav>
      {option === "Search News" && <Search />}
      {option === "Your News" && <Saved />}
      <Footer />
      </main>
    </div>
  );
}

export default App;
