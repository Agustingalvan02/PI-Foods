import React, { useState, useEffect } from "react";
import {useHistory } from "react-router-dom";
import { postRecipe, getDiets } from "../Actions/actions";
import { useDispatch, useSelector } from "react-redux";
export default function CreateRecipe() {
  const dispatch = useDispatch();
  const history= useHistory()
  const diets = useSelector((state) => state.diets);
  const [input, setInput] = useState({
    name: " ",
    summary: " ",
    spoonacularScore: "",
    healthScore: "",
    steps: [],
    diets: [],
    image: "",
  });
  useEffect(() => {
    dispatch(getDiets());
  }, [dispatch]);


 function handleChange(e){
    setInput({
      ...input,
      [e.target.name] : e.target.value
    })
    console.log(input)
  }
  
  function handleSelect(e){
    setInput({
      ...input,
      diets:[...input.diets,e.target.value]
    })
  }
  function handleSubmit(e){
    e.preventDefault()
    console.log(input)
    dispatch(postRecipe(input))
    alert("Receta Creada!")
    setInput({
      name: " ",
      summary: " ",
      spoonacularScore: "",
      healthScore: "",
      steps: [],
      diets: [],
      image: "",
    })
    history.push('/home')
  }
  return (
    <div>
      <h1>Create your recipe</h1>
      <form onSubmit={e=>handleSubmit(e)}>
        <div>
          <label>Title:</label>
          <input type="text" value={input.name} name="name" onChange={e=>handleChange(e)} />
        </div>
        <div>
          <label>Summary:</label>
          <input type="text" value={input.summary} name="summary"  onChange={e=>handleChange(e)} />
        </div>
        <div>
          <label>SpoonAcular Score:</label>
          <input type="number" value={input.spoonacularScore} name="spoonacularScore"  onChange={e=>handleChange(e)}/>
        </div>
        <div>
          <label> Health Score:</label>
          <input type="number" value={input.healthScore} name="healthScore" onChange={e=>handleChange(e)} />
        </div>
        <div>
          <label> steps:</label>
          <input type="text" value={input.steps} name="steps" onChange={e=>handleChange(e)} />
        </div>
        <div>
          <label> image:</label>
          <input type="text" value={input.image} name="image" onChange={e=>handleChange(e)} />
        </div>
        <div>
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
