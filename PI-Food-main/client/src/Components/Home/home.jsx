import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getRecipes,
  filterByScore,
  filterByName,
  filterByDiets,
  getDiets,
} from "../../Actions/actions";
import Card from "../Card/card";
import Paginado from "../Paginado/paginado";
import SearchBar from "../SearchBar/SearchBar";
import { Link } from "react-router-dom";
import "./home.css";
import NavBar from "../NavBar/nav";
export default function Home() {
  const dispatch = useDispatch();
  const allRecipes = useSelector((state) => state.recipes);
  const diets = useSelector((state) => state.diets);
  const [currentPage, setCurrentPage] = useState(1);
  const [recipesPerPage, setRecipesPerPage] = useState(9);
  const indexofLastRecipe = currentPage * recipesPerPage;
  const indexofFirstRecipe = indexofLastRecipe - recipesPerPage;
  const currentRecipes = allRecipes.slice(
    indexofFirstRecipe,
    indexofLastRecipe
  );
  const [renderPage, setRenderPage] = useState(" ");

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getRecipes());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getDiets());
  }, [dispatch]);

  function handleClick(e) {
    e.preventDefault();
    dispatch(getRecipes());
  }
  function handleFilterByScore(e) {
    e.preventDefault();
    console.log(e.target.value);
    dispatch(filterByScore(e.target.value));
    setRenderPage(e.target.value);
  }

  function handleFilterByName(e) {
    e.preventDefault();
    dispatch(filterByName(e.target.value));
    setRenderPage(e.target.value);
  }

  function handleFilterByDiets(e) {
    e.preventDefault();
    dispatch(filterByDiets(e.target.value));
    setRenderPage(e.target.value);
  }
  return (
    <div className="container">
      <NavBar />
      <div>
        <div className="cosas">
          <select onChange={(e) => handleFilterByName(e)}>
            <option value="ascendente"> A-Z </option>
            <option value="descendente"> Z-A </option>
          </select>

          <select onChange={(e) => handleFilterByDiets(e)}>
            <option value="all"> All </option>
            {diets?.map((d) => (
              <option value={d.name} key={d.id}>
                {d.name}
              </option>
            ))}
          </select>
          <select
            onChange={(e) => handleFilterByScore(e)}
            defaultValue="default"
          >
            <option disabled>
              {" "}
              Puntaje{" "}
            </option>
            <option value="higher"> Higher </option>
            <option value="lower"> Lower </option>
          </select>
          <SearchBar />
        </div>
        <div>
          <Paginado
            recipesPerPage={recipesPerPage}
            allRecipes={allRecipes?.length}
            paginado={paginado}
          />
          <button
            className="refreshButton"
            onClick={(e) => {
              handleClick(e);
            }}
          >
            Refresh
          </button>
          <div className="CardContainer">
            <div className="CardLine">
              {currentRecipes?.map((r) => {
                return (
                  <div className="cardHome" key={r.id}>
                    <Link className="LinkCard" to={"/recipes/" + r.id}>
                      <Card
                        name={r.name}
                        image={r.image}
                        diet={r.diets + " "}
                        id={r.id}
                      />
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
