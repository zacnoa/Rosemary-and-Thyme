import react from "react";
import {useEffect,useState} from "react";
import axios from "axios";

export function RecipeList({dispatch,refreshTrigger})
{
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
        <div>
            <h2>Recipe List</h2>
            <ul>
                {
                    recipes.map((recipe,index)=>{
                        return(
                            <li key={index}  onClick={()=>handleRecipeClick(recipe.id)}>{recipe.title}</li>
                        );
                    })
                }    
            </ul>


        </div>
    );

}