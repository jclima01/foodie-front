import axios from "axios";

export const GET_RECIPES = "GET_RECIPES";
export const ADD_RECIPE = "ADD_RECIPE";
export const GET_DIETS = "GET_DIETS";
export const GET_RECIPES_BY_QUERY = "GET_RECIPES_BY_QUERY";
export const GET_RECIPES_BY_ID = "GET_RECIPES_BY_ID";
export const SET_SEARCH_KEY = "SET_SEARCH_KEY";
export const DIET_FILTER = "DIET_FILTER";
export const ALPHABETICAL_SORT = "ALPHABETICAL_SORT";
export const SCORE_SORT = "SCORE_SORT";
export const GET_RECIPES_FROM_DB_OR_DB = "GET_RECIPES_FROM_DB_OR_DB";
export const CLEAN_RECIPE = "CLEAN_RECIPE";
export const SET_LOADING = "SET_LOADING";
export const CLEAN_STATES = "CLEAN_STATES";

export const setSearchKey = (searchKey) => {
  try {
    return async function (dispatch) {
      return dispatch({
        type: SET_SEARCH_KEY,
        payload: searchKey,
      });
    };
    // eslint-disable-next-line no-unreachable
  } catch (err) {
    console.log(err);
  }
};

export const getRecipes = () => {
  try {
    return function (dispatch) {
      fetch("http://localhost:6800/recipes")
        .then((response) => response.json())
        .then((data) => {
          return dispatch({
            type: GET_RECIPES,
            payload: data,
          });
        });
    };
    // eslint-disable-next-line no-unreachable
  } catch (err) {
    console.log(err);
  }
};
export const addRecipe = (title, image, summary, steps, healthScore, diets) => {
  try {
    return async function (dispatch) {
      await axios.post("http://localhost:6800/recipes", {
        title,
        image,
        summary,
        steps,
        healthScore,
        diets,
      });
      dispatch(getRecipes());
      return dispatch({
        type: ADD_RECIPE,
      });
    };
    // eslint-disable-next-line no-unreachable
  } catch (err) {
    console.log(err);
  }
};
export const getDiets = () => {
  try {
    return async function (dispatch) {
      const { data } = await axios.get("http://localhost:6800/diets");
      return dispatch({
        type: GET_DIETS,
        payload: data,
      });
    };
    // eslint-disable-next-line
  } catch (err) {
    console.log(err);
  }
};
export const getRecipesByQuery = (searchKey) => {
  try {
    return async function (dispatch) {
      const { data } = await axios.get(
        `http://localhost:6800/recipes?query=${searchKey}`
      );
      return dispatch({
        type: GET_RECIPES_BY_QUERY,
        payload: data,
      });
    };
    // eslint-disable-next-line no-unreachable
  } catch (error) {
    console.log(error);
  }
};

export const getRecipeById = (id) => {
  try {
    return async function (dispatch) {
      const { data } = await axios.get(`http://localhost:6800/recipes/${id}`);

      return dispatch({
        type: GET_RECIPES_BY_ID,
        payload: data,
      });
    };
    // eslint-disable-next-line no-unreachable
  } catch (error) {
    console.log(error);
  }
};

export const dietFilter = (payload) => {
  try {
    return {
      type: DIET_FILTER,
      payload: payload,
    };
    // eslint-disable-next-line no-unreachable
  } catch (error) {
    console.log(error);
  }
};

export function aplhabeticalSort(payload) {
  try {
    return {
      type: ALPHABETICAL_SORT,
      payload: payload,
    };
    // eslint-disable-next-line no-unreachable
  } catch (error) {
    console.log(error);
  }
}
export function scoreSort(payload) {
  try {
    return {
      type: SCORE_SORT,
      payload: payload,
    };
    // eslint-disable-next-line no-unreachable
  } catch (error) {
    console.log(error);
  }
}

export const getRecipesFromApiorDB = (payload) => {
  try {
    return async function (dispatch) {
      return dispatch({
        type: GET_RECIPES_FROM_DB_OR_DB,
        payload: payload,
      });
    };
    // eslint-disable-next-line no-unreachable
  } catch (err) {
    console.log(err);
  }
};

export const cleanRecipe = (id) => {
  try {
    return async function (dispatch) {
      return dispatch({
        type: CLEAN_RECIPE,
      });
    };
    // eslint-disable-next-line no-unreachable
  } catch (error) {
    console.log(error);
  }
};

export const setLoading = (boolean) => {
  try {
    return async function (dispatch) {
      return dispatch({
        type: SET_LOADING,
        payload: boolean,
      });
    };
    // eslint-disable-next-line no-unreachable
  } catch (error) {
    console.log(error);
  }
};
export const cleanStates = () => {
  try {
    return async function (dispatch) {
      return dispatch({
        type: CLEAN_STATES,
      });
    };
    // eslint-disable-next-line no-unreachable
  } catch (error) {
    console.log(error);
  }
};
