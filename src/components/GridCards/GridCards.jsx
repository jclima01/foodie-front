import React from "react";
import RecipeCard from "../RecipeCard/RecipeCard";
import s from "./GridCards.module.css";
import { useSelector } from "react-redux";

const GridCards = ({ recipes }) => {
  const loading = useSelector(state => state.loading)
  return (
    <>
      <div className={s.cardsContainer}>
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </>
  );
};

export default GridCards;
