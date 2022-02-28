import React from "react";
import "./paginado.css"
export default function Paginado({recipesPerPage,allRecipes,paginado}){
 const pageNumber=[]
 for (let i = 1; i <= Math.ceil(allRecipes/recipesPerPage); i++) {
     pageNumber.push(i);
     
 }
 return(
        <nav>
         <ul className="paginado">
             {
                 pageNumber&&pageNumber.map(number=>{
                  return(
                     <li key={number} >
                     <button  onClick={()=>paginado(number)}>{number}</button>
                     </li>
                 )})
             }
         </ul>
         </nav>
    
 )
}