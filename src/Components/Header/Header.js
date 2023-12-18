import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { SearchContext } from "../Context/SearchContext";
import "./Header.css";

export default function Header() {
  const { searchIsOpen, handleClick, styles } = useContext(SearchContext);
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);

  const toggleIsOpen = () => {
    setIsHamburgerOpen((prevState) => !prevState);
  };

  return (
    <div className="Header">
      <div className="Header-left">
        <Link to="/">
          <img className="Header-filmicon" src="/images/filmicon.png" alt="" />
        </Link>
        <Link to="/">
          <h4>Filmania</h4>
        </Link>
      </div>

      <div className="Header-right">
        <div className="header-hamburger">
          <img
            className="header-hamburger-icon"
            onClick={toggleIsOpen}
            src="../images/hamburgerwhite.png"
            alt=""
          />
        </div>

        {isHamburgerOpen && (
          <div className="header-hamburgerMenu">
            <nav>
              <Link to="movie">Movies</Link>
              <Link to="tv">TV Shows</Link>
            </nav>
          </div>
        )}

        <div className="header-navbar">
          <Link to="movie">Movies</Link>
          <Link to="tv">TV Shows</Link>
        </div>
        <button onClick={handleClick}>
          <img
            className="Header-searchicon"
            src="/images/searchwhite.png"
            alt=""
          />
        </button>
      </div>
    </div>
  );
}
