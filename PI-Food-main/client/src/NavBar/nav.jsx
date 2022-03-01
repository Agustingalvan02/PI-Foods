import React from "react";
import {Link} from "react-router-dom";
import './nav.css'


export default function NavBar(){
    return(
        <nav className="">
            <ul>
            <li><Link className="linkStyle" to='/home'>Home</Link></li>
            <li><Link className="linkStyle" to='/recipe'>Create Recipe</Link></li>
            </ul>
        </nav>
    )
}