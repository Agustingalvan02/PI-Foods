
const initialState={
    recipes : []
}


export default function rootReducer(state= initialState,action){
 switch (action.type) {
     case "GET_RECIPES":
       return{
           ...state,
           recipes:action.payload
       }
 
     default:
     return state
 }
}