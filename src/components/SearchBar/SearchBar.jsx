import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecipesByQuery, setSearchKey } from "../../redux/actions";
import styles from "./SearchBar.module.css";
import img from "../../assets/search.png"
const SearchBar = () => {
  const dispatch = useDispatch();
  const searchKey = useSelector((state) => state.searchKey);

  const handleInputChange = (e) => {
    dispatch(setSearchKey(e.target.value));
  };
  const handleButton = (e) => {
    e.preventDefault();
    dispatch(getRecipesByQuery(searchKey));
  };
  return (
    <div className={styles.searchBarContainer}>
      <input
        type="text"
        name="input"
        className={styles.input}
        onChange={handleInputChange}
        placeholder="Busca tu receta..."
      />
      <button onClick={handleButton} className={styles.btn}>
        <img src={img} alt="search" />
      </button>
    </div>
  );
};

export default SearchBar;
