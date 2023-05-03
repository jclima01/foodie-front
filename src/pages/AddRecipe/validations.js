
export const validation = (payload) => {
  let errors = {};
  if (!payload.title)
    errors.title = "Enter recipe title";
  if (!payload.image)
    errors.image = "Enter image url";
  if (!payload.summary)
    errors.summary = "Enter a summary";
  if (!payload.healthScore)
    errors.healthScore = "Enter score";
  if (payload.diets.length === 0)
    errors.diets = "Select at least one diet";
  if (payload.steps.length === 0)
    errors.steps = "Add at least one steps";

  return errors;
};
