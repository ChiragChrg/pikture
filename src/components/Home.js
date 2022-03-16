import React, { useState, useEffect } from "react";
import axios from "axios";
import { Skeleton } from "@mui/material";
import "../App.css";
import "../Mobile.css";
import { useNavigate } from "react-router-dom";
import LazyLoad from "react-lazyload";

const Home = () => {
  //Run fetch function on page load
  useEffect(() => {
    FetchImages();
  }, []);

  const navigate = useNavigate();
  const [images, setImages] = useState([]);

  //Fetch random images from Unsplash API
  const FetchImages = async () => {
    //Div Elements
    var SkeletonBox = document.querySelector(".SkeletonImages");
    var DashImages = document.querySelector(".DashImages");

    const API = `https://api.unsplash.com/`;
    const API_KEY = process.env.REACT_APP_UNSPLASH_API_KEY;

    const RandomURL = `${API}photos?client_id=${API_KEY}&page=1&per_page=30&order_by=latest`;
    SkeletonBox.style.display = "grid";

    try {
      var res = await axios.get(RandomURL);
      var data = res.data;
      // console.log(data.length);

      if (data.length > 0 && data.length !== 313) {
        setImages(data);
        SkeletonBox.style.display = "none";
        DashImages.style.display = "block";
      } else {
        SkeletonBox.style.display = "grid";
        DashImages.style.display = "none";
        console.log("Error"); //Error Handling
      }
    } catch (err) {
      console.log(err);
    }
  };

  //Lazy Loading Placeholder
  const removePlaceholder = (evt) => {
    const parent = evt.currentTarget.parentNode;
    const grandparent = parent.parentNode;
    const currentPlaceholder = grandparent.firstChild;
    currentPlaceholder.style.display = "none";
  };

  //Fake IDs for Skeleton mapping
  var FakeID = [];
  for (var i = 0; i < 20; i++) {
    FakeID.push({ id: i });
  }

  // <Link to="/photo" state={images} key={images.id}></Link>

  //navigate to Photo page on imageClick
  const gotoPreview = (images) => {
    navigate("/download", { state: images });
  };

  return (
    <>
      {/* Random Onload Images */}
      <div className="DashImages">
        {images.map((images) => (
          <div
            className="ImgWrapper"
            key={images.id}
            onClick={() => gotoPreview(images)}
          >
            <div className="Placeholder">
              <Skeleton animation="wave" variant="rectangular" height="100%" />
            </div>

            <LazyLoad className="Image">
              <img
                onLoad={removePlaceholder}
                src={images.urls.small}
                alt={images.id}
              />
            </LazyLoad>
          </div>
        ))}
      </div>

      {/* Skeleton Images */}
      <div className="SkeletonImages">
        {FakeID.map((FakeID) => (
          <div
            className="Skeleton"
            key={FakeID.id}
            onClick={() => {
              console.log(FakeID.id);
            }}
          >
            <Skeleton animation="wave" variant="rectangular" height="250px" />
          </div>
        ))}
      </div>
    </>
  );
};

export default Home;
