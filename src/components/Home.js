import React, { useState, useEffect } from "react";
import Photos from "./API/Photos";
// import Skeleton from "@mui/material/Skeleton";
// import Select from "@mui/material/Select";
import {
  Skeleton,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";
import "../App.css";
import "../Mobile.css";

const Home = () => {
  //Run fetch function on page load
  useEffect(() => {
    FetchImages();
  }, []);

  // //Div Elements
  var DashImages = document.querySelector(".DashImages");
  var SearchImages = document.querySelector(".SearchImages");

  //Fetch random images from Unsplash API
  const [images, setImages] = useState([]);
  const FetchImages = async () => {
    //Div Elements
    var SkeletonBox = document.querySelector(".SkeletonImages");
    var DashImages = document.querySelector(".DashImages");
    var SearchImages = document.querySelector(".SearchImages");

    const API = `https://api.unsplash.com/`;
    const API_KEY = "UwYbM2BpadCTxoWKpeFHl8iw87xl3RAhc8uP3PWdyu0";
    SkeletonBox.style.display = "grid";

    const res = await fetch(
      `${API}photos?client_id=${API_KEY}&page=1&per_page=20&order_by=popular`
    );
    const data = await res.json();
    if (data) {
      SkeletonBox.style.display = "none";
      SearchImages.style.display = "none";
      DashImages.style.display = "block";
    }
    // console.log(data);
    setImages(data);
  };

  //Set Query state onChange
  const [query, setQuery] = useState("");
  const onChange = (e) => {
    let sValue = e.target.value;
    if (sValue === "") {
      DashImages.style.display = "block";
      SearchImages.style.display = "none";
    }
    setQuery(sValue);
  };

  //Search Query by calling function from Photos.js
  const [srchImg, setSrchImg] = useState([]);
  const search = async (evt) => {
    //Div Elements
    var SkeletonBox = document.querySelector(".SkeletonImages");
    var DashImages = document.querySelector(".DashImages");
    var SearchImages = document.querySelector(".SearchImages");

    if (evt.key === "Enter") {
      SkeletonBox.style.display = "grid";
      const result = await Photos(query);
      if (result) {
        SkeletonBox.style.display = "none";
        DashImages.style.display = "none";
        SearchImages.style.display = "block";
      }
      setSrchImg(result);
    }
  };

  //Fake IDs for Skeleton mapping
  var FakeArray = [
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
    { id: 6 },
    { id: 7 },
    { id: 8 },
    { id: 9 },
    { id: 10 },
  ];

  //Images Filters
  //Image Order By
  const [orderBy, setOrderBy] = useState("");
  const onChangeOrderBy = (evt) => {
    setOrderBy(evt.target.value);
  };

  //Image Orientation
  const [orientation, setOrientation] = useState("");
  const onChangeOrientation = (evt) => {
    setOrientation(evt.target.value);
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

        <div className="ImageControl">
          <div className="Filter OrderBy">
            <div className="FilterIcon">
              <i className="fad fa-mountains"></i>
            </div>
            <div className="Dropdown">
              <FormControl fullWidth>
                <InputLabel id="orderby-label">Order By</InputLabel>
                <Select
                  labelId="orderby-select"
                  id="orderby-select"
                  value={orderBy}
                  autoWidth
                  height="100px"
                  label="Order By"
                  onChange={onChangeOrderBy}
                >
                  <MenuItem value={"latest"}>Latest</MenuItem>
                  <MenuItem value={"oldest"}>Oldest</MenuItem>
                  <MenuItem value={"popular"}>Popular</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>

          <div className="Filter Orientation">
            <div className="FilterIcon">
              <i className="fad fa-mountains"></i>
            </div>
            <div className="Dropdown">
              <FormControl fullWidth sx={{ color: "#fff" }}>
                <InputLabel id="orient-label">Orientation</InputLabel>
                <Select
                  labelId="orient-select"
                  id="orient-select"
                  className="Filter-Select"
                  value={orientation}
                  fullWidth
                  label="Orientation"
                  onChange={onChangeOrientation}
                >
                  <MenuItem className="MenuItem" value={"landscape"}>
                    {/* <i className="far fa-rectangle-wide"></i> */}
                    <p>Landscape</p>
                  </MenuItem>
                  <MenuItem className="MenuItem" value={"portrait"}>
                    {/* <i className="far fa-rectangle-portrait"></i> */}
                    <p>Portrait</p>
                  </MenuItem>
                  <MenuItem className="MenuItem" value={"squarish"}>
                    {/* <i className="far fa-square"></i> */}
                    <p>Squarish</p>
                  </MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
        </div>
      </div>

      {/* Random Onload Images */}
      <div className="DashImages">
        {images.map((images) => (
          <div className="Image" key={images.id}>
            <img src={images.urls.small} alt={images.id} />
          </div>
        ))}
      </div>

      {/* Search Result Images */}
      <div className="SearchImages">
        {srchImg.map((srchImg) => (
          <div className="Image" key={srchImg.id}>
            <img src={srchImg.urls.small} alt={srchImg.id} />
          </div>
        ))}
      </div>

      {/* Skeleton Images */}
      <div className="SkeletonImages">
        {FakeArray.map((Skele) => (
          <div className="Skeleton" key={Skele.id}>
            <Skeleton animation="wave" variant="rectangular" height="250px" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
