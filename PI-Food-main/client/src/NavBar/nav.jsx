import React from "react";
import {Link} from "react-router-dom";



export default function NavBar(){
    return(
        <nav>
            <ul>
            <li><Link to='/home'>Home</Link></li>
            <li><Link to='/recipe'>Crear Receta</Link></li>
            <li></li>

            </ul>
        </nav>
    )
}