import React, { useEffect } from "react";
import {
  aplhabeticalSort,
  dietFilter,
  getDiets,
  getRecipesFromApiorDB,
  scoreSort,
} from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import s from "./Filters.module.css";
const Filters = () => {
  const diets = useSelector((state) => state.diets);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDiets());
  }, [dispatch]);

  function handleDietTypeFilter(e) {
    e.preventDefault();
    dispatch(dietFilter(e.target.value));
  }

  function handleAlphabeticalSort(e) {
    e.preventDefault();
    dispatch(aplhabeticalSort(e.target.value));
  }
  function handleScoreSort(e) {
    e.preventDefault();
    dispatch(scoreSort(e.target.value));
  }
  function handleSource(e) {
    e.preventDefault();
    dispatch(getRecipesFromApiorDB(e.target.value));
  }

  return (
    <div className={s.filtersContainer}>
      <label className={s.label}>Sort:</label>
      <select name="alphabetical" onChange={(e) => handleAlphabeticalSort(e)} className={s.select}>
        <option value="reset"></option>
        <option value="atoz">A to Z</option>
        <option value="ztoa">Z to A</option>
      </select>
      <label className={s.label}>Diets:</label>
      <select name="diets" onChange={(e) => handleDietTypeFilter(e)} className={s.select}>
        <option value="reset"></option>
        {
          diets?.map((diet) => {
            return (
              <option key={diet.id} value={diet.name}>
                {diet.name}
              </option>
            );
          })
        }
      </select>
      <label className={s.label}>Health Score:</label>
      <select name="score" onChange={(e) => handleScoreSort(e)} className={s.select}>
        <option value="reset"></option>
        <option value="asc">Acendent</option>
        <option value="des">Descendent</option>
      </select>
      <label className={s.label}>Source:</label>
      <select name="source" onChange={(e) => handleSource(e)} className={s.select}>
        <option value="reset"></option>
        <option value="api">Api</option>
        <option value="db">Db</option>
      </select>
    </div>
  );
};

export default Filters;
