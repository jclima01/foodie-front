import React from "react";
import s from "./Nav.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import SearchBar from "../SearchBar/SearchBar";
import { useDispatch } from "react-redux";
import { cleanRecipe } from "../../redux/actions";
const Nav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const returnHome = (e) => {
    e.preventDefault()
    navigate("/home")
    dispatch(cleanRecipe())
  };
  const logout = (e) => {
    e.preventDefault()
    navigate("/login")
  };
  return (
    <nav className={s.nav}>
      <div className={s.logoContainer} onClick={returnHome}>
        <img src={logo} alt="logo" className={s.img} />
      </div>

      {location.pathname === "/home" && (
        <div className={s.searchBar}>
          <SearchBar />
        </div>
      )}

      <button className={s.btn} onClick={logout}> Logout</button>
    </nav>
  );
};

export default Nav;
