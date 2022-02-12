import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  // Pop Mobile Navbar
  const openNav = () => {
    document.querySelector("#sidepanel").style.width = "50%";
  };
  const closeNav = () => {
    document.querySelector("#sidepanel").style.width = "0%";
  };

  //Toggle Nav button Active state

  const SwitchActive = (evt) => {
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

  return (
    <>
      <div className="NavBar">
        <div className="Logo">LOGO</div>

        <div className="Nav">
          <button className="openbtn navmain" onClick={openNav}>
            <i className="far fa-bars">Open</i>
          </button>

          <div className="sidebar" id="sidepanel">
            <i
              className="fas fa-times closebtn"
              id="closebtn"
              onClick={closeNav}
            >
              X
            </i>
            <ul>
              <li>
                <Link onClick={SwitchActive} id="A" className="active" to="/">
                  Home
                </Link>
                <Link onClick={SwitchActive} id="B" to="/about">
                  About
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
