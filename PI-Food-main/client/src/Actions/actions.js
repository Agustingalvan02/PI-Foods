import axios from 'axios';

export function getRecipes(){
    return async function(dispatch){
        var response= await axios.get('http://localhost:3001/recipes')
        console.log(response);
        return dispatch({
            type:"GET_RECIPES",
            payload: response.data
        })
    }
    
}
