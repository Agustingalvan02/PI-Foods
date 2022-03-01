import React from "react";
import "./landingPage.css";
import { Link } from "react-router-dom";
import "./landingPage.css";
function landingPage() {
  return (
    <body className="bodyBG">
        <h1>Welcome! </h1>
        <Link to="/home">
          <button>Ingresar</button>
        </Link>
    </body>
  );
}
export default landingPage;
