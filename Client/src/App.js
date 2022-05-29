import "./App.css";
import React, { useState, useEffect } from "react";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import Nav from "./components/Navbar";
import Search from "./pages/Search";
import Saved from "./pages/Saved";

function App() {

  const [option, setOption] = useState("Search News");

  useEffect(() => {
    document.title = `perspective - ${option}`;
  });


  return (
    <div>
      <Header />
      <main>
        <Nav option={option} setOption={setOption} />
        {option === "Search News" && <Search />}
        {option === "Your News" && <Saved />}
        <Footer />
      </main>
    </div>
  );
}

export default App;
