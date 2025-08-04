
import {useEffect,useState,useRef} from "react";
import axios from "axios";
import style from "../style/RecipeList.module.css";
import gsap from "gsap";
import {useGSAP} from "@gsap/react";

gsap.registerPlugin(useGSAP);

export function RecipeList({dispatch,refreshTrigger})

{

    const recipeListRef=useRef();
    const t1=useRef();

  
    
    const [recipes,setRecipes]=useState([]);
    const fetchRecipes=()=>
    {
        axios.get("http://localhost:4000/recipes")
        .then(response=>{
            console.log("Recipes:", response.data); // Log the fetched recipes
            setRecipes(response.data); // Set the recipes state
        })
        .catch(error=>{console.error("Error fetching recipes:",error)});
    }

    useEffect(()=>{
        fetchRecipes();
    },[refreshTrigger]);



     

    const handleRecipeClick=id=>{
        axios.get(`http://localhost:4000/recipe/${id}`)
        .then(response=>{
            dispatch({
                type:"request_recipe",
                object:response.data
            });
        })
        .catch(error=>{
            console.error("Error fetching recipe:",error);
        });
    }


    return(
        <div className={style.navbar} ref={recipeListRef}>
            <ul>
                {
                    recipes.map((recipe,index)=>{
                        return(
                            <li className="box" key={index}  onClick={()=>handleRecipeClick(recipe.id)}>{recipe.title}</li>
                        );
                    })
                }    
            </ul>
        </div>
    );

}