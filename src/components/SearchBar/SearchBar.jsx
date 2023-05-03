import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecipesByQuery, setLoading, setSearchKey } from "../../redux/actions";
import styles from "./SearchBar.module.css";
import img from "../../assets/search.png"
const SearchBar = () => {
  const dispatch = useDispatch();
  const searchKey = useSelector((state) => state.searchKey);
  const inputRef = useRef(null);
  const handleInputChange = (e) => {
    dispatch(setSearchKey(e.target.value));
  };
  const handleButton = (e) => {
    e.preventDefault();
    dispatch(setLoading(true))
    dispatch(getRecipesByQuery(searchKey));
    inputRef.current.value = "";
    dispatch(setSearchKey(""));

    
  };
  return (
    <div className={styles.searchBarContainer}>
      <input
        type="text"
        name="input"
        className={styles.input}
        onChange={handleInputChange}
        placeholder="Busca tu receta..."
        ref={inputRef}
        
      />
      <button onClick={handleButton} className={styles.btn}>
        <img src={img} alt="search" />
      </button>
    </div>
  );
};

export default SearchBar;
