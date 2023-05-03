import React from "react";
import s from "./RecipeCard.module.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLoading } from "../../redux/actions";
const RecipeCard = ({ recipe }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleNavigate = () => {
    dispatch(setLoading(true))
    navigate(`/detail/${recipe.id}`);
  };
  return (
    <div className={s.cardContainer} onClick={handleNavigate}>
      <div>
        <img src={recipe.image} alt={recipe.title} className={s.img} />
        <h3 className={s.healthScore}>⭐{recipe.healthScore}</h3>
        <div className={s.dietsContainer}>
          {recipe.diets?.map((diet) => {
            return (
              <h2 key={diet} className={s.diet}>
                {diet}
              </h2>
            );
          })}
        </div>
      </div>
        <h1 className={s.title}>{recipe.title}</h1>
    </div>
  );
};

export default RecipeCard;
