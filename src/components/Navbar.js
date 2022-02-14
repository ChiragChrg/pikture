import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
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

  //Toggle Nav button Active state
  window.onload = () => {
    var CheckUrl = window.location.href;
    if (CheckUrl.indexOf("/about") > -1) {
      document.querySelector("#B").classList.add("active");
      document.querySelector("#A").classList.remove("active");
    } else {
      document.querySelector("#A").classList.add("active");
      document.querySelector("#B").classList.remove("active");
    }
  };

  const SwitchActive = (evt) => {
    if (window.innerWidth < 395) {
      document.querySelector("#sidepanel").style.width = "0%";
    }

    const ASwtch = document.querySelector("#A");
    const BSwtch = document.querySelector("#B");
    let NavClass = evt.target;

    if (NavClass.id === "A") {
      if (NavClass.className === "") {
        ASwtch.classList.add("active");
        BSwtch.classList.remove("active");
      }
    } else if (NavClass.id === "B") {
      if (NavClass.className === "") {
        BSwtch.classList.add("active");
        ASwtch.classList.remove("active");
      }
    }
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
              <Link onClick={SwitchActive} id="A" className="active" to="/">
                Home
              </Link>
              <Link onClick={SwitchActive} id="B" className="" to="/about">
                About
              </Link>
              <a href="https://devbase.netlify.app/" target="_blank">
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
