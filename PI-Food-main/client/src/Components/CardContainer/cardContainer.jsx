import React,{useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { recipeDetail } from "../../Actions/actions";
import './CardContainer.css'
import NavBar from '../NavBar/nav'
export default function CardContainer(props){
    const dispatch= useDispatch();
    useEffect(()=>{
        dispatch(recipeDetail(props.match.params.id))
    },[dispatch,props.match.params.id])

    const detailRecipe=useSelector((state)=>state.detail)
    console.log(detailRecipe.diets)
    if (detailRecipe.diets&&typeof detailRecipe.diets[0]==='object') {
        var diet= detailRecipe.diets?.map(e=>e.name)
    }else{
        diet=detailRecipe.diets
    }
    console.log(diet)
    return(
       
        <div className="CardDiv">
        <NavBar/>
         {(detailRecipe)     
         ?<div>
         <h1>{detailRecipe.name}</h1>
         <img src={detailRecipe.image} alt="img" />
         <h3>Summary:<br/> {detailRecipe.summary}</h3>
         <h3>Diets:
         <ul>
             {diet?.map((d)=>
         {return <li>{d}</li>
         
        })}
         </ul>
         </h3>
         <h3>SpoonAcularScore:{detailRecipe.spoonacularScore}</h3>
         <h3>healthScore:{detailRecipe.healthScore  ||detailRecipe.healthyScore}</h3>
         <h3>Steps:<br/>{detailRecipe.steps}</h3>
         
         </div>:
         <p>Cargando ...</p>
         }
        </div>
    )
}