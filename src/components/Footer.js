import React from "react";

const Footer = () => {
  return (
    <div className="Footer">
      <footer>
        <div className="social">
          <a
            href="https://www.facebook.com/ChiragChrg"
            id="f"
            target="_blank"
            rel="noreferrer"
          >
            <i className="fab fa-facebook fa-2x"></i>
          </a>
          <a
            href="https://www.instagram.com/chiragchrg/"
            id="i"
            target="_blank"
            rel="noreferrer"
          >
            <i className="fab fa-instagram fa-2x"></i>
          </a>
          <a
            href="https://twitter.com/ChiragChrg1"
            id="t"
            target="_blank"
            rel="noreferrer"
          >
            <i className="fab fa-twitter fa-2x"></i>
          </a>
        </div>

        <p>&#169; Copyright 2022 ChiragChrg</p>
      </footer>
    </div>
  );
};

export default Footer;
