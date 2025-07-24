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
import { RecipeList } from "./components/RecipeList.jsx";

function App() {

  const reset=()=>{
    dispatch({
      type:"reset"
    })
  }
  
  const handleSubmit=()=>{
    console.log(recipe);
      axios.post("http://localhost:4000/recipe",recipe)
      .then((response)=>{
          console.log("Recipe saved successfully:", response.data);
      })
      .catch((error)=>{
          console.error("Error saving recipe:", error);
      });
      setRefreshTrigger(prev=>!prev);
      reset();
  }





  const [refreshTrigger,setRefreshTrigger]=useState(false);
  const [recipe,dispatch]=useReducer(RecipeReducer,initialState);

  return (
    <>
      <main>
      <h1>Give It To Me</h1>
      <RecipeList dispatch={dispatch} refreshTrigger={refreshTrigger}/>
      <TitleDescription title={recipe.title} description={recipe.description} dispatch={dispatch} image={recipe.headerImage}/>
      <Ingredients ingredients={recipe.ingredients} dispatch={dispatch} image={recipe.ingredientsImage}/>
      <Instructions instructions={recipe.instructions} dispatch={dispatch}/>
      <Aside dispatch={dispatch} aside={recipe.aside} image={recipe.asideImage}/>
      <button onClick={handleSubmit}>Finish</button>
      </main>
      

      
    </>
  )
}

export default App
