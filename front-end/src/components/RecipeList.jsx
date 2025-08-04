
import {useEffect,useState,useRef} from "react";
import axios from "axios";
import style from "../style/RecipeList.module.css";
import {gsap} from "gsap";
import {CustomBounce} from "gsap/CustomBounce";
import { CustomEase } from "gsap/CustomEase";
import {useGSAP} from "@gsap/react";

gsap.registerPlugin(useGSAP,CustomBounce,CustomEase);



export function RecipeList({dispatch,refreshTrigger,isSidebarOpen})

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



    const t1=useRef();
    useGSAP(() => {
    t1.current = gsap.timeline({ paused: true })
      .fromTo(`.${style.box}`,
        { opacity: 0, transform: "translateX(500px)" },
        { delay:0.40, opacity: 1, transform: "translateX(0)", duration: 0.5 , 
        ease: CustomEase.create("custom", "M0,0 C0.191,0 0.332,0.438 0.373,0.561 0.429,0.728 0.486,0.963 0.497,1 0.507,0.985 0.568,0.873 0.624,0.811 0.7,0.726 0.786,0.753 0.805,0.762 0.91,0.812 0.989,0.981 1,0.998 ") }
      );
    if (isSidebarOpen) {
      t1.current.play();
    } else {
      t1.current.reverse();
    }
  }, { dependencies: [isSidebarOpen,recipes] });
  
    

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
        <div className={style.navbar}>
            <ul>
                {
                    recipes.map((recipe,index)=>{
                        return(
                            <li className={style.box} key={index}  onClick={()=>handleRecipeClick(recipe.id)}>{recipe.title}</li>
                        );
                    })
                }    
            </ul>
        </div>
    );

}