import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { cleanRecipe, getRecipeById } from "../../redux/actions";

import s from "./RecipeDetail.module.css";
import Loading from "../../components/Loading/Loading";
const RecipeDetail = () => {
  const loadingDetail = useSelector((state) => state.loadingDetail);
  const { id } = useParams();
  const dispatch = useDispatch();
  const recipe = useSelector((state) => state.recipe);
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getRecipeById(id));
  }, [dispatch,id]);

  const handleButton = (e) => {
    e.preventDefault();
    dispatch(cleanRecipe());
    navigate("/home");
  };

  return (
    <>
      {loadingDetail ? (
        <Loading />
      ) : (
        <div key={recipe.id} className={s.detailContainer}>
          <div className={s.titleImgContainer}>
            <h1>{recipe.title}</h1>
            <img src={recipe.image} alt="Pic not found" className={s.img} />
            <div className={s.dietsContainer}>
              <h2>Diets:</h2>
              {recipe.diets?.map((diet) => {
                return <h2 key={diet}>{diet}</h2>;
              })}
            </div>
            <div>
              <h3>Healthiness points: </h3>
              <h3 className={s.healthScore}>⭐{recipe.healthScore}</h3>
            </div>
          </div>

          <div className={s.summaryStepsContainer}>
            <div className={s.summaryContainer}>
              <h3>Summary: </h3>
              <p>{recipe.summary?.replace(/<[^>]*>/g, "")}</p>
            </div>
            <div className={s.stepsContainer}>
              <h3>Steps: </h3>
              <ul>
                {recipe.steps?.map((e) => {
                  return (
                    <li key={e.number}>
                      {e.number} - {e.step}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          <button onClick={handleButton} className={s.btn}>
            Go back to recipes
          </button>
        </div>
      )}
    </>
  );
};

export default RecipeDetail;
