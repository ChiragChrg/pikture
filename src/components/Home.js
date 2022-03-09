import React, { useState, useEffect } from "react";
import axios from "axios";
import { Skeleton } from "@mui/material";
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
    //Div Elements
    var SkeletonBox = document.querySelector(".SkeletonImages");
    var DashImages = document.querySelector(".DashImages");

    const API = `https://api.unsplash.com/`;
    const API_KEY = "UwYbM2BpadCTxoWKpeFHl8iw87xl3RAhc8uP3PWdyu0";
    const RandomURL = `${API}photos?client_id=${API_KEY}&page=1&per_page=20&order_by=latest`;
    SkeletonBox.style.display = "grid";

    try {
      var res = await axios.get(RandomURL);
      var data = res.data;
      // console.log(data);

      if (data.length > 0) {
        setImages(data);
        SkeletonBox.style.display = "none";
        DashImages.style.display = "block";
      } else {
        console.log("Error");
      }
    } catch (err) {
      console.log(err);
    }
  };

  //Fake IDs for Skeleton mapping
  var FakeID = [];
  for (var i = 0; i < 20; i++) {
    FakeID.push({ id: i });
  }
  // console.log(FakeID);

  return (
    <div className="container">
      {/* Random Onload Images */}
      <div className="DashImages">
        {images.map((images) => (
          <div className="Image" key={images.id}>
            <img src={images.urls.small} alt={images.id} />
          </div>
        ))}
      </div>

      {/* Skeleton Images */}
      <div className="SkeletonImages">
        {FakeID.map((Skele) => (
          <div className="Skeleton" key={Skele.id}>
            <Skeleton animation="wave" variant="rectangular" height="250px" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
