import axios from "axios";

export function getRecipes() {
  return async function (dispatch) {
    var response = await axios.get("http://localhost:3001/recipes");

    return dispatch({
      type: "GET_RECIPES",
      payload: response.data,
    });
  };
}
export function getDiets() {
  return async function (dispatch) {
    var response = await axios.get("http://localhost:3001/types");

    return dispatch({
      type: "GET_DIETS",
      payload: response.data,
    });
  };
}
export function searchByName(name) {
  return async function (dispatch) {
    try {
      var response = await axios.get(
        "http://localhost:3001/recipes?name=" + name
      );
      return dispatch({
        type: "SEARCH_RECIPES_NAME",
        payload: response.data,
      });
    } catch (error) {
      console.log("Receta no encontrada!");
    }
  };
}
export function filterByDiets(payload) {
  return {
    type: "FILTER_BY_DIETS",
    payload,
  };
}
export function filterByScore(payload) {
  return {
    type: "FILTER_BY_SCORE",
    payload,
  };
}

export function filterByName(payload) {
  return {
    type: "FILTER_BY_NAME",
    payload,
  };
}

export function recipeDetail(id) {
  return async function (dispatch) {
    let response = await axios.get("http://localhost:3001/recipes/" + id);
    return dispatch({
      type: "RECIPE_DETAIL",
      payload: response.data,
    });
  };
}

export function postRecipe(payload) {
  return async function (dispatch) {
    const response = await axios.post("http://localhost:3001/recipes/", payload);
    console.log(response);
    return dispatch({
      type: "POST_RECIPE",
      payload: response.data
    })
  };
}
