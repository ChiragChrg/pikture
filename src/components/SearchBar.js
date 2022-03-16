import React, { useEffect, useState } from "react";
import { InputLabel, Select, MenuItem, FormControl } from "@mui/material";
import { useNavigate } from "react-router-dom";

//Image Orientation Acc to device screen size
const { innerWidth: width } = window;
if (width < 396) var userOrient = "portrait";
else userOrient = "landscape";

const SearchBar = () => {
  const navigate = useNavigate(); //Used to change path dynamically
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState({
    orderBy: "relevant",
    orientation: userOrient,
  });
  // console.log(filter);

  const path = window.location.pathname;
  useEffect(() => {
    const searchBar = document.querySelector(".SearchBar");
    if (path === "/about" || path === "/download")
      searchBar.style.display = "none";
    else searchBar.style.display = "flex";
  }, [path]);

  useEffect(() => {
    search("Search");
  }, [filter]); // eslint-disable-line react-hooks/exhaustive-deps

  //Set Query state onChange
  const onChange = (e) => {
    let sValue = e.target.value;
    if (sValue === "") {
      navigate("/");
    }
    setQuery(sValue);
  };

  const search = (evt) => {
    //Just because 'onSubmit' is not working, so using 'onkeypress'
    var goSearch = evt; //if called by Filter Changes
    if (evt.key === "Enter") {
      goSearch = "Search"; //if called by pressing Enter
    }

    var orderBy = filter.orderBy;
    var orientation = filter.orientation;

    if (goSearch === "Search") {
      if (query !== "") {
        //Redirects to /search with query
        navigate(`/search`, {
          state: {
            query: query,
            orderBy: orderBy,
            orientation: orientation,
          },
        });
      }
    }
  };

  //Images Filters
  const showFilters = () => {
    const ImageControl = document.querySelector(".ImageControl");

    if (ImageControl.style.display === "none") {
      ImageControl.style.display = "flex";
    } else ImageControl.style.display = "none";
  };

  //Image Orientation
  const onChangeOrientation = (evt) => {
    var usrOrient = evt.target.value;
    setFilter({ ...filter, orientation: usrOrient });
  };

  //Image Order By
  const onChangeOrderBy = (evt) => {
    var usrOrder = evt.target.value;
    setFilter({ ...filter, orderBy: usrOrder });
  };

  return (
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
                value={filter.orderBy}
                fullWidth
                label="Order By"
                onChange={onChangeOrderBy}
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
                value={filter.orientation}
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
  );
};

export default SearchBar;
