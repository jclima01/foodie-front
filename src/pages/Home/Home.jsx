import GridCards from "../../components/GridCards/GridCards.jsx";
import React, { useEffect, useState } from "react";
import styles from "./Home.module.css";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "../../components/Pagination/Pagination.jsx";
import { getRecipes, setLoading } from "../../redux/actions/index.js";
import Loading from "../../components/Loading/Loading.jsx";
const Home = () => {
  const recipes = useSelector((state) => state.recipes);
  const searchKey = useSelector((state) => state.searchKey);
  const loading = useSelector((state) => state.loading);
  const dispatch = useDispatch();

  const [actualPage, setActualPage] = useState(1);
  // const recipesPerPage = 9;
  const [recipesPerPage, setRecipesPerPage] = useState(9);

  const lastRecipeIndex = actualPage * recipesPerPage;

  const firstRecipeIndex = lastRecipeIndex - recipesPerPage;

  const recipeSlice = recipes.slice(firstRecipeIndex, lastRecipeIndex);

  useEffect(() => {
    if (recipeSlice.length === 0) dispatch(getRecipes());
  }, []);

  const handleButton = (e) => {
    e.preventDefault();
    dispatch(setLoading(true));
    if (recipeSlice.length === 0) dispatch(getRecipes());
  };
  return (
    <div className={styles.homeContainer}>
      {loading ? (
        <Loading />
      ) : recipeSlice.length !== 0 ? (
        <>
          <Pagination
            recipesPerPage={recipesPerPage}
            recipes={recipes.length}
            pagination={setActualPage}
          />
          <GridCards recipes={recipeSlice} />
        </>
      ) : (
        <>
          <h1>Recipes not found</h1>
          <button onClick={handleButton}>All Recipes</button>
        </>
      )}
    </div>
  );
};

export default Home;
