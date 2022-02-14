import React, { useState, useEffect } from "react";
import Photos from "./API/Photos";
import "../App.css";
import "../Mobile.css";

const Home = () => {
  //Run fetch function on page load
  useEffect(() => {
    FetchImages();
  }, []);

  const [images, setImages] = useState([]);

  //Fetch random images from Unsplash API
  const FetchImages = async () => {
    const API = `https://api.unsplash.com/`;
    const API_KEY = "UwYbM2BpadCTxoWKpeFHl8iw87xl3RAhc8uP3PWdyu0";

    const res = await fetch(
      `${API}photos?client_id=${API_KEY}&page=1&per_page=20&order_by=popular`
    );
    const data = await res.json();
    // console.log(data);
    setImages(data);
  };

  //Set Query state onChange
  const [query, setQuery] = useState("");
  const onChange = (e) => {
    let sValue = e.target.value;
    if (sValue === "") {
      document.querySelector(".DashImages").style.display = "block";
      document.querySelector(".SearchImages").style.display = "none";
    }
    setQuery(sValue);
  };

  //Search Query by calling function from Photos.js
  const [srchImg, setSrchImg] = useState([]);
  const search = async (evt) => {
    if (evt.key === "Enter") {
      const result = await Photos(query);
      if (result) {
        document.querySelector(".DashImages").style.display = "none";
        document.querySelector(".SearchImages").style.display = "block";
      }
      setSrchImg(result);
    }
  };

  return (
    <div className="container">
      <div className="SearchBar">
        <input
          type="text"
          className="Search"
          placeholder="Search for Piktures"
          value={query}
          onChange={onChange}
          onKeyPress={search}
        />
      </div>

      <div className="DashImages">
        {images.map((images) => (
          <div className="Image" key={images.id}>
            <img src={images.urls.small} alt={images.id} />
          </div>
        ))}
      </div>

      <div className="SearchImages">
        {srchImg.map((srchImg) => (
          <div className="Image" key={srchImg.id}>
            <img src={srchImg.urls.small} alt={srchImg.id} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
