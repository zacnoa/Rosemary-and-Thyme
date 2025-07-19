import React, { useState,useEffect,useReducer} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios';
import { initialState,RecipeReducer} from './components/RecipeReducer.jsx';
import { TitleDescription } from "./components/TitleDescription.jsx";
import { Ingredients } from "./components/Ingredients.jsx";
import { Instructions } from "./components/Instructions.jsx";
import { Aside } from "./components/Aside.jsx";

function App() {

  const reset=()=>{
    dispatch({
      type:"reset"
    })
  }
  const handleClick=()=>{
    console.log(recipe);
      axios.post("http://localhost:4000/recipe",recipe)
      .then((response)=>{
          console.log("Recipe saved successfully:", response.data);
      })
      .catch((error)=>{
          console.error("Error saving recipe:", error);
      });
      reset();
  }
  const handleFetch=()=>{
    axios.get("http://localhost:4000/recipe")
    .then((response)=>{
      console.log("Latest recipe:",response.data);
      const data=response.data;
      dispatch({
        type:"request_recipe",
        object:data
      })
     
    })
    .catch((error)=>{
      console.error("Error fetching recipe:",error);
    });

  }





  const [recipe,dispatch]=useReducer(RecipeReducer,initialState);

  return (
    <>
      <TitleDescription title={recipe.title} description={recipe.description} dispatch={dispatch} image={recipe.headerImage}/>
      <Ingredients ingredients={recipe.ingredients} dispatch={dispatch} image={recipe.ingredientsImage}/>
      <Instructions instructions={recipe.instructions} dispatch={dispatch}/>
      <Aside dispatch={dispatch} aside={recipe.aside} image={recipe.asideImage}/>
      <button onClick={handleClick}>Finish</button>
      <button onClick={handleFetch}>show latest</button>

      
    </>
  )
}

export default App
