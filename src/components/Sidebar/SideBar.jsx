import React from "react";
import { Link } from "react-router-dom";
import s from "./SideBar.module.css";
import Filters from "../Filters/Filters";
const SideBar = () => {
  return (
    <div className={s.sidebarcontainer}>
      
      <Filters />
      <Link to="/addRecipe">
        <button className={s.btn}>Crea tu receta</button>
      </Link>
    </div>
  );
};

export default SideBar;
