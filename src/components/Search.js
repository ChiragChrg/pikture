import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { Skeleton } from "@mui/material";
import { Blurhash } from "react-blurhash";
import { useNavigate } from "react-router-dom";
import LazyLoad from "react-lazyload";

const Search = () => {
  const [srchImg, setSrchImg] = useState([]);
  const navigate = useNavigate();

  const { state } = useLocation(); //get data from useNavigate() in SearchBar.js
  const query = state.query;
  const orderBy = state.orderBy;
  const orientation = state.orientation;
  // console.log(state);

  useEffect(() => {
    Photos();
  }, [state]); // eslint-disable-line react-hooks/exhaustive-deps

  const Photos = async () => {
    //Div Elements
    var SkeletonBox = document.querySelector(".SkeletonImages");
    var SearchImages = document.querySelector(".SearchImages");

    if (query !== "") {
      const API = `https://api.unsplash.com/search/`;
      const API_KEY = process.env.REACT_APP_UNSPLASH_API_KEY;

      var URL = `${API}photos?client_id=${API_KEY}&query=${query}&page=1&per_page=30&order_by=${orderBy}&orientation=${orientation}`;

      try {
        SkeletonBox.style.display = "grid";
        var res = await axios.get(URL);
        var data = res.data.results;
        // console.log(data.length);

        if (data.length > 0) {
          setSrchImg(data);
          SkeletonBox.style.display = "none";
          SearchImages.style.display = "block";
        } else {
          SkeletonBox.style.display = "grid";
          SearchImages.style.display = "none";
          console.log("Error"); //Error handling
        }
      } catch (err) {
        console.log(err);
      }
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

  //navigate to Photo page on imageClick
  const gotoPreview = (srchImg) => {
    navigate("/download", { state: srchImg });
  };

  return (
    <>
      {/* <SearchBar /> */}
      <div className="SearchImages">
        {srchImg.map((srchImg) => (
          <div
            className="ImgWrapper"
            key={srchImg.id}
            onClick={() => gotoPreview(srchImg)}
          >
            <div className="Placeholder">
              {/* <Skeleton animation="wave" variant="rectangular" height="100%" /> */}
              <Blurhash
                hash={srchImg.blur_hash}
                width="100%"
                height="100%"
                resolutionX={32}
                resolutionY={32}
                punch={1}
              />
            </div>

            <LazyLoad className="Image">
              <img
                onLoad={removePlaceholder}
                src={srchImg.urls.small + "&fm=webp"}
                alt={srchImg.id}
                width="100%"
                height="100%"
              />
            </LazyLoad>
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
    </>
  );
};

export default Search;
