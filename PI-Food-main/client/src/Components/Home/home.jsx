import React from 'react';
import { useState,useEffect } from 'react';
import{useDispatch,useSelector} from 'react-redux';
import { getRecipes,filterByScore, filterByName, filterByDiets, getDiets } from '../../Actions/actions';
import Card from '../Card/card';
import Paginado from '../Paginado/paginado';
import  SearchBar  from '../SearchBar';
import { Link } from 'react-router-dom';
export default function Home () {
    const dispatch= useDispatch();
    const allRecipes= useSelector((state)=>state.recipes);
    const diets = useSelector(state => state.diets);
    const[currentPage,setCurrentPage]=useState(1);
    const[recipesPerPage,setRecipesPerPage]=useState(9);
    const indexofLastRecipe= currentPage * recipesPerPage;
    const indexofFirstRecipe= indexofLastRecipe-recipesPerPage;
    const currentRecipes= allRecipes.slice(indexofFirstRecipe,indexofLastRecipe);
    const[renderPage,setRenderPage]=useState(" ");



   const paginado=(pageNumber)=>{
       setCurrentPage(pageNumber)
   }

  
    
    useEffect(()=>{
        dispatch(getRecipes());
    },[dispatch])

    useEffect(()=>{
        dispatch(getDiets());
    },[dispatch])
   
    function handleClick(e) {
        e.preventDefault();
        dispatch(getRecipes())
    }
    function handleFilterByScore(e) {
        e.preventDefault();
        console.log(e.target.value)
        dispatch(filterByScore(e.target.value))
        setRenderPage(e.target.value)
    }

    function handleFilterByName(e) {
        e.preventDefault();
        dispatch(filterByName(e.target.value))
        setRenderPage(e.target.value)
    }

    function handleFilterByDiets(e){
        e.preventDefault();
        dispatch(filterByDiets(e.target.value))
        setRenderPage(e.target.value)
    }
    return(
        <div>

            <h1>Soy el Home!</h1>
            <button onClick={e=>{handleClick(e)}}>Refresh</button>
            <div>
            
                <select onChange={e=>handleFilterByName(e)}>
                    <option value='ascendente'> A-Z </option>
                    <option value='descendente'> Z-A </option>
                </select>
                
                <select onChange={e=>handleFilterByDiets(e)}>
                    <option value='all'> All </option>
                    {/* <option value='gluten free'> Gluten free </option>
                    <option value='dairy'> Dairy free </option>
                    <option value='vegan'> Vegan </option>
                    <option value='foodmap'> Foodmap Friendly </option>
                    <option value='primal'> Primal </option>
                    <option value='pescatarian'> Pescatarian </option>
                    <option value='lacto ovo vegetarian'> Lacto-Ovo-Vegetarian </option>
                    <option value='whole30'> Whole 30 </option> */}
                    {diets?.map(d=>(
                        <option value={d.name} key={d.id} >{d.name}</option>
                    ))}

                </select>
                <select onChange={e=> handleFilterByScore(e)} defaultValue='default'>
                   <option value='default' disabled> Puntaje </option>
                    <option value='higher'> Higher </option>
                    <option value='lower'> Lower </option>
                </select>
                <select>
                    <option value='todas'> Todas </option>
                    <option value='creadas'> Creadas </option>
                    <option value='api'> API </option>
                </select>
                <div>
               <Paginado
               recipesPerPage={recipesPerPage}
               allRecipes={allRecipes?.length}
               paginado={paginado}
               />
               <SearchBar/>
               </div>
                {
                    currentRecipes?.map(r=>{
                        return(
                        <div key={r.id}>
                         <Link to={'/recipes/'+ r.id}> 
                         <Card 
                         name={r.name} image={r.image} diet={r.diets + " "}  spoonacularScore={r.Spoonacularscore} healthScore={r.healthScore} id={r.id} />
                         </Link>  
                        </div>
                        )}
                        )
                        
                }
            </div>
        </div>
        
    )
};