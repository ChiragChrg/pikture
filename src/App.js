import React from "react";
import { BrowserRouter as Browser, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Search from "./components/Search";
import SearchBar from "./components/SearchBar";
import Download from "./components/Download";
import "./App.css";

function App() {
  //Switch Dektop/Moblie Buttons
  // const mediaQuery = window.matchMedia("(max-width: 395px)");
  // const DesktopInstall = document.querySelector(".deskPwa");
  // const MobileInstall = document.querySelector(".mobPwa");
  // if (mediaQuery.matches) {
  //   MobileInstall.classList.toggle("pwaButtonHolder");
  // } else {
  //   DesktopInstall.classList.toggle("pwaButtonHolder");
  // }

  return (
    <Browser>
      <Navbar />
      <SearchBar />

      <Routes>
        <Route path="/download" element={<Download />} />
        <Route path="/search" element={<Search />} />
        <Route path="/about" exact element={<About />} />
        <Route path="/" exact element={<Home />} />
      </Routes>

      <Footer />
    </Browser>
  );
}

export default App;
