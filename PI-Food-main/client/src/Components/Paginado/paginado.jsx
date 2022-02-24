import React from "react";

export default function Paginado({recipesPerPage,allRecipes,paginado}){
 const pageNumber=[]
 for (let i = 1; i <= Math.ceil(allRecipes/recipesPerPage); i++) {
     pageNumber.push(i);
     
 }
 return(
     <nav>
         <ul>
             {
                 pageNumber&&pageNumber.map(number=>{
                     <li  key={number}>
                     <button onClick={()=>paginado(number)}>{number}</button>
                     </li>
                 })
             }
         </ul>
     </nav>
 )
}