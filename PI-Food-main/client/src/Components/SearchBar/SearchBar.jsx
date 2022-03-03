import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { searchByName } from "../../Actions/actions";
import './SearchBar.css'
export default function SearchBar() {
    const dispatch=useDispatch()
    const[name,setName]=useState('')



    function handleInputChange(e){
      e.preventDefault()
      setName(e.target.value)
      console.log(e)
    }
    function handleSubmit(e){
        e.preventDefault()
        dispatch(searchByName(name))
        console.log(name)
    }
    return(
        <div>
        <input onChange={(e)=>handleInputChange(e)}    type="text"  placeholder="Buscar.."/>
        <button className="ButtonSearch"  onClick={(e)=>handleSubmit(e)}  type="submit">Buscar</button>
        </div>
    )
}