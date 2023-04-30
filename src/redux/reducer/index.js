// Importa las action types acá

import {
  GET_RECIPES,
  ADD_RECIPE,
  GET_DIETS,
  GET_RECIPES_BY_QUERY,
  GET_RECIPES_BY_ID,
  SET_SEARCH_KEY,
  ALPHABETICAL_SORT,
  DIET_FILTER,
  SCORE_SORT,
  GET_RECIPES_FROM_DB_OR_DB,
  LOADING
} from "../actions";

const initialState = {
  allRecipes: [],
  recipes: [],
  diets: [],
  recipe: {},
  searchKey: "",
  recipesFromApi: [],
  recipesFromDB: [],
  loading: true,
};

const rootReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOADING:
      return {
        ...state,
        loading: payload
      }
    case SCORE_SORT:
      let sortedByScore = [...state.recipes];
      if (payload === "reset") {
        return {
          ...state,
          recipes: [...state.allRecipes],
        };
      }
      sortedByScore =
        payload === "asc"
          ? state.recipes.sort(function (a, b) {
              if (a.healthScore > b.healthScore) return 1;
              if (a.healthScore < b.healthScore) return -1;
            })
          : state.recipes.sort(function (a, b) {
              if (a.healthScore < b.healthScore) return 1;
              if (a.healthScore > b.healthScore) return -1;
            });
      return {
        ...state,
        recipes: [...sortedByScore],
      };
    case DIET_FILTER:
      const recipes = [...state.recipes];
      const filteredByDietType = recipes.filter((r) =>
        r.diets?.some((d) => d.toLowerCase() === payload.toLowerCase())
      );
      if (payload === "reset") {
        return {
          ...state,
          recipes: [...state.allRecipes],
        };
      }
      return {
        ...state,
        recipes: [...filteredByDietType],
      };

    case ALPHABETICAL_SORT:
      let sortedRecipes = [...state.recipes];
      if (payload === "reset") {
        return {
          ...state,
          recipes: [...state.allRecipes],
        };
      }
      sortedRecipes =
        payload === "atoz"
          ? sortedRecipes.sort(function (a, b) {
              if (a.title.toLowerCase() > b.title.toLowerCase()) return 1;
              if (a.title.toLowerCase() < b.title.toLowerCase()) return -1;
            })
          : sortedRecipes.sort(function (a, b) {
              if (a.title.toLowerCase() < b.title.toLowerCase()) return 1;
              if (a.title.toLowerCase() > b.title.toLowerCase()) return -1;
            });
      return {
        ...state,
        recipes: [...sortedRecipes],
      };
    case SET_SEARCH_KEY:
      return {
        ...state,
        searchKey: payload,
      };
    case GET_RECIPES:
      return {
        ...state,
        recipes: [...payload],
        allRecipes: [...payload],
      };
    case ADD_RECIPE:
      return {
        ...state,
        recipes: [...state.recipes],
        allRecipes: [...state.recipes],
      };
    case GET_DIETS:
      return {
        ...state,
        diets: [...payload],
      };
    case GET_RECIPES_BY_QUERY:
      return {
        ...state,
        recipes: [...payload],
      };
    case GET_RECIPES_BY_ID:
      return {
        ...state,
        recipe: { ...payload },
      };
    case GET_RECIPES_FROM_DB_OR_DB:
      const allRecipes = [...state.allRecipes];
      const recipesFromApi = allRecipes.filter((r) => r.source === "api");
      const recipesFromDb = allRecipes.filter((r) => r.source === "db");
      if (payload === "reset") {
        return {
          ...state,
          recipes: [...state.allRecipes],
        };
      }
      if (payload === "api") {
        return {
          ...state,
          recipes: [...recipesFromApi],
        };
      }
      if (payload === "db") {
        return {
          ...state,
          recipes: [...recipesFromDb],
        };
      }
    default:
      return {
        ...state,
      };
  }
};

export default rootReducer;
