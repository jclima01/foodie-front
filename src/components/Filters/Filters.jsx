import React, { useEffect, useRef, useState } from "react";
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
  const searchKey = useSelector((state) => state.searchKey);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDiets());
  }, [dispatch]);

  const [isDisabled, setIsDistabled] = useState({
    alphabetical: false,
    diets: false,
    score: false,
    source: false
  });
  
  const alphabeticalRef = useRef(null);
  const dietsRef = useRef(null);
  const scoreRef = useRef(null);
  const sourceRef = useRef(null);

  const handleDietTypeFilter = (e) => {
    e.preventDefault();
    dispatch(dietFilter(e.target.value));
    setIsDistabled({
      ...isDisabled,
      diets: !isDisabled.diets
    });
  };

  const handleAlphabeticalSort = (e) => {
    e.preventDefault();
    dispatch(aplhabeticalSort(e.target.value));
    setIsDistabled({
      ...isDisabled,
      alphabetical: !isDisabled.alphabetical
    });
  };
  const handleScoreSort = (e) => {
    e.preventDefault();
    dispatch(scoreSort(e.target.value));
    setIsDistabled({
      ...isDisabled,
      score: !isDisabled.score
    });
  };
  const handleSource = (e) => {
    e.preventDefault();
    dispatch(getRecipesFromApiorDB(e.target.value));
    setIsDistabled({
      ...isDisabled,
      source: !isDisabled.source
    });
  };

  const resetFilters = (e) => {
    e.preventDefault();
    alphabeticalRef.current.value = "reset";
    dietsRef.current.value = "reset";
    scoreRef.current.value = "reset";
    sourceRef.current.value = "reset";
    setIsDistabled({
      alphabetical: false,
      diets: false,
      score: false,
      source: false
    });


  };


  return (
    <div className={s.filtersContainer}>
      <label className={s.label}>Sort:</label>
      <select
        name="alphabetical"
        onChange={(e) => handleAlphabeticalSort(e)}
        className={s.select}
        ref={alphabeticalRef}
        disabled={isDisabled.alphabetical}
      >
        <option value="reset"></option>
        <option value="atoz">A to Z</option>
        <option value="ztoa">Z to A</option>
      </select>
      <label className={s.label}>Diets:</label>
      <select
        name="diets"
        onChange={(e) => handleDietTypeFilter(e)}
        className={s.select}
        ref={dietsRef}
        disabled={isDisabled.diets}
      >
        <option value="reset"></option>
        {diets?.map((diet) => {
          return (
            <option key={diet.id} value={diet.name}>
              {diet.name}
            </option>
          );
        })}
      </select>
      <label className={s.label}>Health Score:</label>
      <select
        name="score"
        onChange={(e) => handleScoreSort(e)}
        className={s.select}
        ref={scoreRef}
        
        disabled={isDisabled.score}
      >
        <option value="reset"></option>
        <option value="asc">Acendent</option>
        <option value="des">Descendent</option>
      </select>
      <label className={s.label}>Source:</label>
      <select
        name="source"
        onChange={(e) => handleSource(e)}
        className={s.select}
        ref={sourceRef}
        disabled={isDisabled.source}
      >
        <option value="reset"></option>
        <option value="api">Api</option>
        <option value="db">Db</option>
      </select>
      <button onClick={resetFilters} className={s.btn}>Reset filters</button>
    </div>
  );
};

export default Filters;
