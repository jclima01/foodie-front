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
  CLEAN_RECIPE,
  SET_LOADING,
  CLEAN_STATES,
} from "../actions";

const initialState = {
  recipes: [],
  diets: [],
  recipe: {},
  searchKey: "",
  loading: true,
};

const rootReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ALPHABETICAL_SORT:
      let sortedRecipes = [...state.recipes];
      sortedRecipes =
        payload === "atoz"
          ? sortedRecipes.sort(function (a, b) {
              if (a.title.toLowerCase() > b.title.toLowerCase()) return 1;
              if (a.title.toLowerCase() < b.title.toLowerCase()) return -1;
              return 0;
            })
          : sortedRecipes.sort(function (a, b) {
              if (a.title.toLowerCase() < b.title.toLowerCase()) return 1;
              if (a.title.toLowerCase() > b.title.toLowerCase()) return -1;
              return 0;
            });
      return {
        ...state,
        recipes: [...sortedRecipes],
      };
    case DIET_FILTER:
      const recipes = [...state.recipes];
      const filteredByDietType = recipes.filter((r) =>
        r.diets?.some((d) => d.toLowerCase() === payload.toLowerCase())
      );
      return {
        ...state,
        recipes: [...filteredByDietType],
      };

    case SCORE_SORT:
      let sortedByScore = [...state.recipes];
      sortedByScore =
        payload === "asc"
          ? state.recipes.sort(function (a, b) {
              if (a.healthScore > b.healthScore) return 1;
              if (a.healthScore < b.healthScore) return -1;
              return 0;
            })
          : state.recipes.sort(function (a, b) {
              if (a.healthScore < b.healthScore) return 1;
              if (a.healthScore > b.healthScore) return -1;
              return 0;
            });

      return {
        ...state,
        recipes: [...sortedByScore],
      };

    case GET_RECIPES_FROM_DB_OR_DB:
      const allrecipes = [...state.recipes];
      const filtredByApi = allrecipes.filter((r) => r.source === "api");
      const filtredByDB = allrecipes.filter((r) => r.source === "db");
      if (payload === "api") {
        return {
          ...state,
          recipes: [...filtredByApi],
        };
      }
      if (payload === "db") {
        return {
          ...state,
          recipes: [...filtredByDB],
        };
      }
      break;

    case SET_SEARCH_KEY:
      return {
        ...state,
        searchKey: payload,
      };
    case GET_RECIPES:
      return {
        ...state,
        recipes: [...payload],
        loading: false,
      };
    case ADD_RECIPE:
      return {
        ...state,
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
        loading: false,
      };
    case GET_RECIPES_BY_ID:
      return {
        ...state,
        recipe: { ...payload },
        loading: false,
      };
    case CLEAN_RECIPE:
      return {
        ...state,
        recipe: {},
      };
      case SET_LOADING:
        return{
          ...state,
          loading: payload
        }
      case CLEAN_STATES:
        return {
          recipes: [],
          diets: [],
          recipe: {},
          searchKey: "",
          loading: true,
        }
    default:
      return {
        ...state,
      };
  }
};

export default rootReducer;
