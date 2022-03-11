import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { Skeleton } from "@mui/material";

const Search = () => {
  const [srchImg, setSrchImg] = useState([]);

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

      var URL = `${API}photos?client_id=${API_KEY}&query=${query}&page=1&per_page=20&order_by=${orderBy}&orientation=${orientation}`;

      try {
        SkeletonBox.style.display = "grid";
        var res = await axios.get(URL);
        var data = res.data.results;
        // console.log(data);

        if (data.length > 0) {
          setSrchImg(data);
          SkeletonBox.style.display = "none";
          SearchImages.style.display = "block";
        } else {
          SkeletonBox.style.display = "grid";
          SearchImages.style.display = "none";
          console.log("Error");
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  //Fake IDs for Skeleton mapping
  var FakeID = [];
  for (var i = 0; i < 20; i++) {
    FakeID.push({ id: i });
  }
  // console.log(FakeID);

  return (
    <>
      {/* <SearchBar /> */}
      <div className="SearchImages">
        {srchImg.map((srchImg) => (
          <div className="Image" key={srchImg.id}>
            <img src={srchImg.urls.small} alt={srchImg.id} />
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
