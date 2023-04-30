
export const validation = (payload) => {
  let errors = {};
  if (!payload.title)
    errors.title = "La receta debe tener un titulo";
  if (!payload.image)
    errors.image = "La receta debe tener una url par la imagen";
  if (!payload.summary)
    errors.summary = "La receta debe tener un summary";
  if (!payload.healthScore)
    errors.healthScore = "La receta debe tener un healthScore";

  return errors;
};
