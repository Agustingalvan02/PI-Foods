import React from "react";

export default function Card({name,image,diet,spoonacularScore,healthScore}) {
    return(
        <div>
            <img src={image} alt="img missing" width='350px' height='350px' />
            <h1>{name}</h1>
            <h3> Type of Diet: {diet} </h3>
            <h3>Spoonacular Score: {spoonacularScore}</h3>
            <h3> Health Score: {healthScore}</h3>
        </div>
    )
    
}

