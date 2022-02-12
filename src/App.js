import React from "react";
import { BrowserRouter as Browser, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Navbar from "./components/Navbar";
import "./App.css";

function App() {
  return (
    <Browser>
      <div>
        <Navbar />
      </div>

      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/about" exact element={<About />} />
      </Routes>
    </Browser>
  );
}

export default App;
