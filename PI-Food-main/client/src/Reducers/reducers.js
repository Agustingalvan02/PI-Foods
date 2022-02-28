const initialState = {
  recipes: [],
  allRecipes: [],
  diets: [],
  detail: []
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_RECIPES":
      return {
        ...state,
        recipes: action.payload,
        allRecipes:action.payload
      };
    case "GET_DIETS":
      return {
        ...state,
        diets: action.payload,
      };
      case "SEARCH_RECIPES_NAME":
        return{
          ...state,
          recipes: action.payload
        }
    case "FILTER_BY_DIETS":
      const recipes = state.allRecipes;
      console.log(recipes);
      const typeDiets =
        action.payload === "all"
          ? recipes
          : recipes.filter(function(r){
            if (r.diets){
              if(r.diets.includes(action.payload))
              {
                return r
              }
            }

          });
      return {
        ...state,
        recipes: typeDiets,
      };
    case "FILTER_BY_SCORE":
      const recipesFilteredByScore =
        action.payload === "higher"
          ? state.recipes.sort((h, l) => {
              if (h.healthScore > l.healthScore) return 1;
              if (l.healthScore > h.healthScore) return -1;
              return 0;
            })
          : state.recipes.sort((h, l) => {
              if (h.healthScore > l.healthScore) return -1;
              if (l.healthScore > h.healthScore) return 1;
              return 0;
            });

      return {
        ...state,
        recipes: recipesFilteredByScore,
      };

    case "FILTER_BY_NAME":
      const recipesFilteredByName =
        action.payload === "ascendente"
          ? state.recipes.sort((a, z) => {
              if (a.name > z.name) return 1;
              if (z.name > a.name) return -1;
              return 0;
            })
          : state.recipes.sort((a, z) => {
              if (a.name > z.name) return -1;
              if (z.name > a.name) return 1;
              return 0;
            });

      return {
        ...state,
        recipes: recipesFilteredByName,
      };
      case "RECIPE_DETAIL":
        if(action.payload.length){
        var obj=action.payload[0]
      }else{
         obj=action.payload
      }
        return{
          ...state,
          detail: obj
        }
    default:
      return state;
  }
}
