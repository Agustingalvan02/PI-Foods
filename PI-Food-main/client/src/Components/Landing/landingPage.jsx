import React from "react";
import "./landingPage.css";
import {Link} from "react-router-dom";
 function landingPage(){
    return(
     <div>
         <h1>Food App </h1>
         <Link to='/home'>
         <button>Ingresar</button>
         </Link>
     </div>
    );
};
export default landingPage;