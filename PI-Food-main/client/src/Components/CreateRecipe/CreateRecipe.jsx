import React, { useState, useEffect } from "react";
import {useHistory } from "react-router-dom";
import { postRecipe, getDiets } from "../../Actions/actions";
import { useDispatch, useSelector } from "react-redux";
import NavBar from '../NavBar/nav'
import './CreateRecipe.css'
function formValidation(input) {
  let formErrors = {};
  if (!input.name) {
      formErrors.name = "Title is required";
  }
  if (!input.summary) {
      formErrors.summary = "Summary is required";
  }
  if (!input.steps) {
      formErrors.steps = "Instructions are required";
  }
  if (input.spoonacularScore < 0||input.spoonacularScore > 100) {
      formErrors.spoonacularScore = "Score must between 1 and 100";
  }
  
  if (input.healthyScore < 0||input.healthyScore > 100) {
      formErrors.healthyScore = "Health Score must between 1 and 100";
  }
  return formErrors;
};

export default function CreateRecipe() {
  const dispatch = useDispatch();
  const history= useHistory()
  const diets = useSelector((state) => state.diets);
  const [formErrors, setFormErrors] = useState({})
  const [input, setInput] = useState({
    name: " ",
    summary: " ",
    spoonacularScore: 0,
    healthyScore: 0,
    steps: [],
    diets: [],
    image: "https://st.depositphotos.com/1987177/3470/v/600/depositphotos_34700099-stock-illustration-no-photo-available-or-missing.jpg",
  });
  useEffect(() => {
    dispatch(getDiets());
  }, [dispatch]);


 function handleChange(e){
    setInput({
      ...input,
      [e.target.name] : e.target.value
    })
     setFormErrors(formValidation({
      ...input,
      [e.target.name] : e.target.value
  }))
  }
  
  function handleSelect(e){
    setInput({
      ...input,
      diets:[...input.diets,e.target.value]
    })
  }
  function handleSubmit(e){
    e.preventDefault()
    if (Object.values(formErrors).length > 0) {
      alert("Please fill in all the required fields")
    }else{
      dispatch(postRecipe(input))
      alert("Receta Creada!")
      setInput({
        name: " ",
        summary: " ",
        spoonacularScore: 0,
        healthyScore: 0,
        steps: [],
        diets: [],
        image: "",
      })
      history.push('/home')
    }
  }
  return (
    <div className="formDiv">
      <NavBar/>
      <h1>Create your recipe</h1>
      <form className="FormStyle" onSubmit={e=>handleSubmit(e)}>
        <div className="divForm">
          <label>Title:</label> <br/>
          <input type="text" value={input.name} name="name" onChange={e=>handleChange(e)} />
          {formErrors.name && (<p>{formErrors.name}</p>)}
        </div>
        <div className="divForm">
          <label>Summary:</label> <br/>
          <input type="text" value={input.summary} name="summary"  onChange={e=>handleChange(e)} />
          {formErrors.summary && (<p>{formErrors.summary}</p>)}
        </div>
        <div className="divForm">
          <label>SpoonAcular Score:</label> <br/>
          <input type="number" value={input.spoonacularScore} name="spoonacularScore"  onChange={e=>handleChange(e)}/>
          {formErrors.spoonacularScore && (<p>{formErrors.spoonacularScore}</p>)}
        </div>
        <div className="divForm">
          <label> Health Score:</label> <br/>
          <input type="number" value={input.healthyScore} name="healthyScore" onChange={e=>handleChange(e)} />
          {formErrors.healthyScore && (<p>{formErrors.healthyScore}</p>)}
        </div>
        <div className="divForm">
          <label> steps:</label> <br/>
          <input type="text" value={input.steps} name="steps" onChange={e=>handleChange(e)} />
        </div>
        <div className="divForm">
          <label> image:</label> <br/>
          <input type="text" value={input.image} name="image" onChange={e=>handleChange(e)} />
        </div>
        <div className="divForm">
          <select onChange={e=>handleSelect(e)}>
            <option value="default">-Diet Select-</option>
            {
              diets && diets.map(d => (
                <option value={d.name} key={d.id}>{d.name}</option>
            ))
            }
          </select>
          <ul><li>{input.diets.map(d=> d + ",")}</li></ul>
        </div>
        <button type="submit">Create Recipe</button>
      </form>
    </div>
  );
}
