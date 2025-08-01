import React, { useState, useEffect, useReducer } from 'react'

import './App.css'
import axios from 'axios';
import { initialState, RecipeReducer } from './components/RecipeReducer.jsx';
import { TitleDescription } from "./components/TitleDescription.jsx";
import { Ingredients } from "./components/Ingredients.jsx";
import { Instructions } from "./components/Instructions.jsx";
import { Aside } from "./components/Aside.jsx";
import { RecipeList } from "./components/RecipeList.jsx";

function App() {

  const reset = () => {
    dispatch({
      type: "reset"
    })
  }

  const handleSubmit = () => {
    console.log(recipe);
    axios.post("http://localhost:4000/recipe", recipe)
      .then((response) => {
        console.log("Recipe saved successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error saving recipe:", error);
      });
    setRefreshTrigger(prev => !prev);
    reset();
  }



  const [refreshTrigger, setRefreshTrigger] = useState(false);
  const [recipe, dispatch] = useReducer(RecipeReducer, initialState);

  return (
    <>
      <main>

        <svg viewBox="0 0 900 150" xmlns="http://www.w3.org/2000/svg">
          <text y="70" x="545" fill="#2293ad" fontSize="60" fontWeight="bold" >Give It To</text>
          <text y="150" x="545" fill="#2293ad" fontSize="60" fontWeight="bold">Me</text>
        </svg>
        <RecipeList dispatch={dispatch} refreshTrigger={refreshTrigger} />
        <div style={{ marginBottom: "10rem", padding: "2rem" }}>
          <TitleDescription title={recipe.title} description={recipe.description} dispatch={dispatch} image={recipe.headerImage} />
        </div>
        <svg viewBox="0 0 700 220" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          {/* Dijagonalne linije */}
          <line x1="0" y1="20" x2="700" y2="110" stroke="#2293ad" strokeWidth="3" />
          <line x1="0" y1="140" x2="700" y2="60" stroke="#2293ad" strokeWidth="3" />


          <text x="30" y="100" fill="#2293ad" fontSize="50" fontWeight="bold">
            next...
          </text>

          {/* Tekst "Ingredients" */}
          <text x="350" y="150" fill="#2293ad" fontSize="45" fontWeight="bold">
            Ingredients
          </text>
        </svg>

        <div style={{ padding: "2rem" }}>
          <Ingredients ingredients={recipe.ingredients} dispatch={dispatch} image={recipe.ingredientsImage} />
        </div>

        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.dev/svgjs" viewBox="0 0 800 500"><path d="M32.48427446535777 54.605331238562826C36.21784710736623 59.53364640122152 47.866594869410505 76.70807724838949 54.88571031740855 84.17522221451497C61.9048257654066 91.64236718064046 66.68379457644176 87.759455816403 74.59896715334605 99.40820103531576C82.51413973025035 111.05694625422854 90.4293135787204 147.94463520889974 102.37674577883433 154.06769352799154C114.32417797894826 160.19075184708333 137.62167223147105 135.1011496945768 146.28356035402965 136.14655094986654C154.94544847658824 137.19195220515627 152.5559602563734 150.93149993464846 154.3480745141859 160.34010105972982C156.1401887719984 169.74870218481115 143.5953864241794 191.4034148618132 157.03624590090465 192.59815770035482C170.4771053776299 193.79290053889656 220.65631476890596 161.38549850032226 234.99323137453746 167.50855809097973C249.330147980169 173.63161768163727 228.27279782147755 225.90162958349367 243.0577455346937 229.3365152443009C257.84269324790984 232.7714009051083 310.41139848879527 181.84546961034837 323.70291765383433 188.11787205582354C336.9944368188734 194.3902745012989 313.54760352623015 259.5037846331356 322.8068605249281 266.97092991715266C332.066117523626 274.4380752011696 360.73994056236296 234.41417485123466 379.25845964602183 232.92074375992604C397.7769787296807 231.42731266861736 422.26922726483696 249.79648381119554 433.9179750268812 258.010343369301C445.56672278892546 266.22420292740657 438.24891781659477 280.11309859797944 449.15094621828746 282.2039011085589C460.05297461998015 284.29470361913826 486.1879742130791 278.0223037167946 499.33014543703746 270.55515843277766C512.4723166609958 263.0880131487607 516.8032594507093 240.98526046321382 528.0039735620375 237.40102940445735C539.2046876733656 233.81679834570073 559.6646587833916 239.04379826432063 566.5344301050062 249.0497720802385C573.4042014266208 259.05574589615645 576.6897442326103 282.95061283951594 569.222601491725 297.43687229996516C561.7554587508396 311.9231317604144 528.0039735620375 325.9613575701474 521.7315736596937 335.9673288429339C515.45917375735 345.9733001157203 529.9454306746677 353.8884714210589 531.5882020776625 357.4726999366839 " fill="none" stroke-width="5" stroke="url(&quot;#SvgjsLinearGradient1001&quot;)" stroke-linecap="round" transform="matrix(0.8056689607463181,0.2932395203838452,-0.2932395203838452,0.8056689607463181,109.21484210205784,-52.87436083335041)">
          </path>
          <text x="250" y="425" fill="#3988a4" fontWeight="bold" fontSize="40">Guide Me Darling</text>
          <defs>
            <linearGradient id="SvgjsLinearGradient1001">
              <stop stop-color="#67c2d4" offset="0"></stop>
              <stop stop-color="#3988a4" offset="1"></stop>
            </linearGradient>
          </defs>
        </svg>



        <div style={{ marginBottom: "15rem", padding: "2rem" }}>
          <Instructions instructions={recipe.instructions} dispatch={dispatch} />
        </div>


        <div  className="asideContainer">
          <div className="svgContainer">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox='0 0 500 500'>
              <text x="295" y="60"  fill="#3988a4" fontWeight="bold" fontSize="80" >C</text>
              <text x="110" y="140" fill="#3988a4" fontWeight="bold" fontSize="80" letterSpacing="35">AFA</text>
              <text  x="110" y="220" fill="#3988a4" fontWeight="bold" fontSize="85" letterSpacing="35">TER</text>
              <text  x="295" y="300" fill="#3988a4" fontWeight="bold" fontSize="80">E</text>
            </svg>
          </div>
          <div className="aside">
            <Aside dispatch={dispatch} aside={recipe.aside} image={recipe.asideImage} />
          </div>
        </div>



        <button className="submit" onClick={handleSubmit}><p>FINISH</p></button>
      </main>



    </>
  )
}

export default App
