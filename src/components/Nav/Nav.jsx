import React from "react";
import s from "./Nav.module.css";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/logo.png";
import SearchBar from "../SearchBar/SearchBar";
const Nav = () => {
  const location = useLocation();
  return (
    <nav className={s.nav}>
      <Link to="/home">
        <img src={logo} alt="logo" className={s.img} />
      </Link>

      {location.pathname === "/home" && (
        <div className={s.searchBar}>
          <SearchBar />
        </div>
      )}
    </nav>
  );
};

export default Nav;
