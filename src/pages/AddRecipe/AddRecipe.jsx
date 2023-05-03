import React, { useEffect, useState } from "react";
// import { validation } from "./validations.js";
import s from "./addrecipe.module.css";
import { addRecipe, getDiets, setLoading } from "../../redux/actions/index.js";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { validation } from "./validations.js";

const AddRecipe = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const diets = useSelector((state) => state.diets);
  const [counter, setCounter] = useState(1);
  const [stepsInput, setStepsInput] = useState("");
  const [payload, setPayload] = useState({
    title: "",
    image: "",
    summary: "",
    healthScore: 0,
    steps: [],
    diets: [],
  });
  const [errors, setErrors] = useState({
    title: "",
    image: "",
    summary: "",
    healthScore: "",
    steps: "",
  });

  useEffect(() => {
    dispatch(getDiets());
  }, [dispatch]);

  const handleInputChange = (e) => {
    if (e.target.name === "healthScore") {
      setPayload({
        ...payload,
        [e.target.name]: parseInt(e.target.value),
      });
      setErrors(
        validation({
          ...payload,
          [e.target.name]: e.target.value,
        })
      );
    } else {
      setPayload({
        ...payload,
        [e.target.name]: e.target.value,
      });
      setErrors(
        validation({
          ...payload,
          [e.target.name]: e.target.value,
        })
      );
    }
  };

  const handleStepInputChange = (e) => {
    setStepsInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setLoading(true));
    dispatch(
      addRecipe(
        payload.title,
        payload.image,
        payload.summary,
        payload.steps,
        payload.healthScore,
        payload.diets
      )
    );
    navigate("/home");
  };
  console.log(payload.healthScore);
  const addStep = (e) => {
    e.preventDefault();
    setCounter(counter + 1);
    setPayload({
      ...payload,
      steps: [...payload.steps, { number: counter, step: stepsInput }],
    });

    setStepsInput("");
  };

  return (
    <div className={s.pageContainer}>
      <div className={s.addRecipeContainer}>
        <h1>Crea tu nueva receta:</h1>

        <form onSubmit={handleSubmit} className={s.formContainer}>
          <div className={s.inputs}>
            <label text="title" htmlFor="title">
              Title:
            </label>
            <input
              name="title"
              id="title"
              placeholder="Recipe title"
              type="text"
              value={payload.title}
              onChange={handleInputChange}
              className={s.input}
            />
            {errors.title && <p>{errors.title}</p>}

            <label htmlFor="image">Image:</label>
            <input
              name="image"
              id="image"
              placeholder="Url image"
              type="text"
              value={payload.image}
              onChange={handleInputChange}
              className={s.input}
            />
            {errors.image && <p>{errors.image}</p>}

            <label text="summary" htmlFor="summary">
              Resumen:
            </label>
            <input
              name="summary"
              id="summary"
              placeholder="Summary"
              type="text"
              value={payload.summary}
              onChange={handleInputChange}
              className={s.input}
            />
            {errors.summary && <p>{errors.summary}</p>}

            <label text="healthScore" htmlFor="healthScore">
              healthScore:
            </label>
            <input
              name="healthScore"
              id="healthScore"
              placeholder="Ingresa un puntaje de salud para la receta"
              type="text"
              value={payload.healthScore}
              onChange={handleInputChange}
              className={s.input}
            />
            {errors.healthScore && <p>{errors.healthScore}</p>}

            <label text="steps" htmlFor="steps">
              Steps:
            </label>
            <div>
              <input
                name="stepsInput"
                id="stepsInput"
                placeholder="Ingresa las steps de la receta"
                type="text"
                value={stepsInput}
                onChange={handleStepInputChange}
                className={s.input}
              />
              <button onClick={addStep} className={s.btn1}>
                +
              </button>
              {errors.steps && <p>{errors.steps}</p>}
            </div>
          </div>
          <div className={s.checkboxs}>
            {diets?.map((diet) => {
              return (
                <div key={diet.id}>
                  <input
                    type="checkbox"
                    name={diet.name}
                    id={diet.id}
                    className={s.checked}
                    checked={payload.diets.some((d) => d.id === diet.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setPayload({
                          ...payload,
                          diets: [
                            ...payload.diets,
                            { id: diet.id, name: diet.name },
                          ],
                        });
                      } else {
                        setPayload({
                          ...payload,
                          diets: payload.diets.filter((d) => d.id !== diet.id),
                        });
                      }
                    }}
                  />
                  <label htmlFor={diet.name} className={s.container}>
                    {diet.name}
                  </label>
                </div>
              );
            })}
          </div>
          <button className={s.btn} type="submit" >
            Crear Receta
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddRecipe;
