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
