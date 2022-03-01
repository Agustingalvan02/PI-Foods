import React from "react";
import './card.css'
export default function Card({name,image,diet,spoonacularScore,healthScore}) {
    return(
        <div className="cardStyle">
            <img className="img" src={image} alt="img missing" width='350px' height='350px' />
            <h1 className="h1Card">{name}</h1>
            <h3 className="h3Card"> Type of Diet: {diet} </h3>
            <h3 className="h3Card">Spoonacular Score: {spoonacularScore}</h3>
            <h3 className="h3Card"> Health Score: {healthScore}</h3>
        </div>
    )
    
}

