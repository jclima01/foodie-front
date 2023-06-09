import React from "react";
import RecipeCard from "../RecipeCard/RecipeCard";
import s from "./GridCards.module.css";

const GridCards = ({ recipes }) => {
  
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
