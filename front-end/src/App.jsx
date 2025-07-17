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






  const [recipe,dispatch]=useReducer(RecipeReducer,initialState);

  return (
    <>
      <TitleDescription title={recipe.title} description={recipe.description} dispatch={dispatch} image={recipe.headerImage}/>
      <Ingredients ingredients={recipe.ingredients} dispatch={dispatch} image={recipe.ingredientsImage}/>
      <Instructions instructions={recipe.instructions} dispatch={dispatch}/>
      <Aside dispatch={dispatch} aside={recipe.aside} image={recipe.asideImage}/>
      
    </>
  )
}

export default App
