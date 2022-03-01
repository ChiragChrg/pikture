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
// import { makeStyles } from "@mui/styles";
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

    //Just because 'onSubmit' is not working, so using 'onkeypress'
    var goSearch = evt; //if called by Filter Changes
    if (evt.key === "Enter") {
      goSearch = "Search"; //if called by pressing Enter
    }

    if (goSearch === "Search") {
      SkeletonBox.style.display = "grid";
      console.log(query, orderBy, orientation);
      const result = await Photos(query, orderBy, orientation);
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
  const showFilters = () => {
    const ImageControl = document.querySelector(".ImageControl");

    if (ImageControl.style.display === "none") {
      ImageControl.style.display = "flex";
    } else ImageControl.style.display = "none";
  };

  //The Filters are inverter for unknown reasons,
  // so Im manually inverting the filters at HTML Div Components

  //Image Order By
  const [orderBy, setOrderBy] = useState("relevant");
  const onChangeOrderBy = (evt) => {
    setOrderBy(evt.target.value);
    search("Search");
  };

  //Image Orientation
  const { innerWidth: width } = window;
  if (width < 396) var userOrientation = "portrait";
  else userOrientation = "landscape";

  const [orientation, setOrientation] = useState(userOrientation);
  const onChangeOrientation = (evt) => {
    setOrientation(evt.target.value);
    search("Search");
  };
  //Select Component Custon Styling
  // const color = "white";
  // const useStyles = makeStyles({
  //   select: {
  //     "&:before": {
  //       borderColor: color,
  //     },
  //     "&:after": {
  //       borderColor: color,
  //     },
  //   },
  //   icon: {
  //     fill: color,
  //   },
  // });
  // const classes = useStyles();

  return (
    <div className="container">
      <div className="SearchBar">
        <div className="SearchHolder">
          <div className="SearchBtn SIcon">
            <i className="fas fa-search"></i>
          </div>
          <input
            type="text"
            className="Search"
            placeholder="Search for Piktures"
            value={query}
            onChange={onChange}
            onKeyPress={search}
          />
          <div className="FilterBtn SIcon" onClick={showFilters}>
            <i className="fas fa-filter"></i>
          </div>
        </div>

        <div className="ImageControl" style={{ display: "none" }}>
          <div className="Filter OrderBy">
            <div className="Dropdown">
              <FormControl fullWidth>
                <InputLabel id="orderby-label">Order By</InputLabel>
                <Select
                  labelId="orderby-select"
                  id="orderby-select"
                  className="Filter-Select"
                  value={orderBy}
                  fullWidth
                  label="Order By"
                  onChange={onChangeOrderBy}
                  // className={classes.select}
                  // inputProps={{
                  //   classes: {
                  //     icon: classes.icon,
                  //     root: classes.root,
                  //   },
                  // }}
                >
                  <MenuItem value={"latest"}>
                    <div className="MenuItem">
                      <i className="far fa-fire-alt"></i>
                      <p>Latest</p>
                    </div>
                  </MenuItem>
                  <MenuItem value={"relevant"}>
                    <div className="MenuItem">
                      <i className="far fa-thumbs-up"></i>
                      <p>Relevant</p>
                    </div>
                  </MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>

          <div className="Filter Orientation">
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
                  <MenuItem value={"landscape"}>
                    <div className="MenuItem">
                      <i className="far fa-rectangle-wide"></i>
                      <p>Landscape</p>
                    </div>
                  </MenuItem>
                  <MenuItem value={"portrait"}>
                    <div className="MenuItem">
                      <i className="far fa-rectangle-portrait"></i>
                      <p>Portrait</p>
                    </div>
                  </MenuItem>
                  <MenuItem value={"squarish"}>
                    <div className="MenuItem">
                      <i className="far fa-square"></i>
                      <p>Squarish</p>
                    </div>
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
