import React from "react";
import { BrowserRouter as Browser, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  return (
    <Browser>
      <Navbar />

      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/about" exact element={<About />} />
      </Routes>

      <Footer />
    </Browser>
  );
}

export default App;
