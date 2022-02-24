import React from 'react';
import { useState,useEffect } from 'react';
import{useDispatch,useSelector} from 'react-redux';
import { getRecipes } from '../../Actions/actions';
import Card from '../Card/card';
import Paginado from '../Paginado/paginado';

export default function Home () {
    const dispatch= useDispatch();
    const allRecipes= useSelector((state)=>state.recipes);
    const[currentPage,setCurrentPage]=useState(1);
    const[recipesPerPage,setRecipesPerPage]=useState(9);
    const indexofLastRecipe= currentPage * recipesPerPage;
    const indexofFirstRecipe= indexofLastRecipe-recipesPerPage;
    const currentRecipes= allRecipes.slice(indexofFirstRecipe,indexofLastRecipe);




   const paginado=(pageNumber)=>{
       setCurrentPage(pageNumber)
   }


    console.log(allRecipes);
    useEffect(()=>{
        dispatch(getRecipes());
    },[dispatch])
   
    function handleClick(e) {
        e.preventDefault();
        dispatch(getRecipes())
    }
    return(
        <div>
            <h1>Soy el Home!</h1>
            <button onClick={e=>{handleClick(e)}}>Refresh</button>
            <Paginado
            recipesPerPage={recipesPerPage}
            allRecipes={allRecipes?.lenght}
            paginado={paginado}
            />
            <div>
                <select>
                    <option value='ascendente'> A-Z </option>
                    <option value='descendente'> Z-A </option>
                </select>
                <select>
                    <option value='gluten'> All </option>
                    <option value='gluten'> Gluten free </option>
                    <option value='dairy'> Dairy free </option>
                    <option value='vegan'> Vegan </option>
                    <option value='foodmap'> Foodmap Friendly </option>
                    <option value='primal'> Primal </option>
                    <option value='pescatarian'> Pescatarian </option>
                    <option value='lov'> Lacto-Ovo-Vegetarian </option>
                    <option value='whole30'> Whole 30 </option>
                </select>
                <select>
                    <option value='todas'> Todas </option>
                    <option value='creadas'> Creadas </option>
                </select>
                <div>
               </div>
                {
                    currentRecipes?.map(r=>{
                        return(
                        <Card 
                        name={r.name} image={r.image} diet={r.diets + " "}  spoonacularScore={r.Spoonacularscore} healthScore={r.healthScore} key={r.id}/>
                        )}
                        )
                        
                }
            </div>
        </div>
        
    )
};