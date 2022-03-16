import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  //Toggle Active class on Navbar
  const location = useLocation();
  React.useEffect(() => {
    var path = location.pathname;
    const ActiveA = document.querySelector("#A");
    const ActiveB = document.querySelector("#B");
    if (path === "/search" || path === "/download") {
      ActiveA.classList.remove("active");
      ActiveB.classList.remove("active");
    } else if (path === "/about") {
      if (ActiveA.className === "active") ActiveA.classList.remove("active");
      ActiveB.classList.add("active");
    } else {
      if (ActiveB.className === "active") ActiveB.classList.remove("active");
      ActiveA.classList.add("active");
    }

    if (window.innerWidth < 395) {
      document.querySelector("#sidepanel").style.width = "0%";
    }
  }, [location]);

  // Pop Mobile Navbar
  const openNav = () => {
    document.querySelector("#sidepanel").style.width = "50%";
    document.querySelector("html").style.overflow = "hidden";
    document.querySelector("body").style.overflow = "hidden";
  };
  const closeNav = () => {
    document.querySelector("#sidepanel").style.width = "0%";
    document.querySelector("html").style.overflow = "auto";
    document.querySelector("body").style.overflow = "auto";
  };

  //Check previous Theme on load
  window.onload = () => {
    let ToggleHolder = document.querySelector(".toggleHolder");
    let Toggle = document.querySelector("#toggle");
    let Body = document.querySelector("body");

    const currentTheme = localStorage.getItem("myTheme")
      ? localStorage.getItem("myTheme")
      : null;

    if (currentTheme) {
      Body.setAttribute("data-theme", currentTheme);

      if (currentTheme === "dark") {
        Toggle.className = "fad fa-lightbulb-on fa-2x";
        ToggleHolder.title = "Turn On Light Mode";
      } else {
        Toggle.className = "fad fa-lightbulb fa-2x";
        ToggleHolder.title = "Turn On Dark Mode";
      }
    }
  };

  //Toggle Dark Mode
  const changeTheme = () => {
    let ToggleHolder = document.querySelector(".toggleHolder");
    let Toggle = document.querySelector("#toggle");
    let Body = document.querySelector("body");
    var DataTheme = Body.getAttribute("data-theme");

    if (DataTheme === "light") {
      Body.setAttribute("data-theme", "dark");
      Toggle.className = "fad fa-lightbulb-on fa-2x";
      ToggleHolder.title = "Turn On Light Mode";
      localStorage.setItem("myTheme", "dark");
    } else {
      Body.setAttribute("data-theme", "light");
      Toggle.className = "fad fa-lightbulb fa-2x";
      ToggleHolder.title = "Turn On Dark Mode";
      localStorage.setItem("myTheme", "light");
    }
  };

  //Mobile navigation swipe right to left
  document.body.addEventListener("touchstart", startTouch, { passive: false });
  document.body.addEventListener("touchmove", moveTouch, { passive: false });

  var initialX = null;
  var initialY = null;

  function startTouch(e) {
    initialX = e.touches[0].clientX;
    initialY = e.touches[0].clientY;
  }

  function moveTouch(e) {
    if (initialX === null) {
      return;
    }

    if (initialY === null) {
      return;
    }

    var currentX = e.touches[0].clientX;
    var currentY = e.touches[0].clientY;

    var diffX = initialX - currentX;
    var diffY = initialY - currentY;

    if (Math.abs(diffX) > Math.abs(diffY)) {
      if (diffX > 0) {
        document.querySelector("#sidepanel").style.width = "50%";
      } else {
        document.querySelector("#sidepanel").style.width = "0%";
      }
    }

    initialX = null;
    initialY = null;

    e.preventDefault();
  }

  return (
    <div className="NavBar">
      <div className="Logo">
        <a href="https://pikture.netlify.app/">
          <i className="fad fa-mountains"></i>
          <h4>&nbsp;Piktures</h4>
        </a>
      </div>

      <div className="Nav">
        <button className="openbtn navmain" onClick={openNav}>
          <i className="fad fa-bars fa-2x"></i>
        </button>

        <div className="sidebar" id="sidepanel">
          <i
            className="fas fa-times fa-2x closebtn"
            id="closebtn"
            onClick={closeNav}
          ></i>
          <ul>
            <li>
              <Link id="A" className="active" to="/">
                Home
              </Link>
              <Link id="B" className="" to="/about">
                About
              </Link>
              <a
                href="https://devbase.netlify.app/"
                target="_blank"
                rel="noreferrer"
              >
                DevBase
              </a>

              <div
                className="toggleHolder"
                onClick={changeTheme}
                title="Turn On Dark Mode"
              >
                <i id="toggle" className="fad fa-lightbulb fa-2x"></i>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
