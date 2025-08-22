
import {useEffect,useState,useRef} from "react";
import axios from "axios";
import style from "../style/RecipeList.module.css";
import {gsap} from "gsap";
import {useGSAP} from "@gsap/react";


gsap.registerPlugin(useGSAP);



export function RecipeList({dispatch,refreshTrigger,isSidebarOpen,NSFWtrigger})

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


    const recentRecipesRef = useRef();
    const t1=useRef();
    const textAreaRef = useRef();


    useGSAP(() => {
        
        t1.current=gsap.timeline({ paused: true })
        .fromTo("ul",
            { opacity: 0, y: 100 },
            { opacity: 1, y: 0, duration: 1,  ease: "power1.in" },
        "<")
        .fromTo(recentRecipesRef.current,
            {x:"-100%",opacity:0},
            {x:"0%",opacity:1, duration: 1, ease: "power1.Out" }
        ,"<")   

      return () => {
        if (t1.current) {
          t1.current.kill();
          t1.current = null;
        }
      };
    }, { dependencies: [recipes] });
    
    useEffect(() => {
      if (t1.current) {
        if (isSidebarOpen) {
          t1.current.play();
        } else {
            t1.current.reverse();
        }
      }
    }, [isSidebarOpen]);
    

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
        <div className={style.recipelist}>
            <div className={style.search}>
                <label htmlFor="search">What do you desire?</label>
                <textarea id="search"  ref={textAreaRef} className={style.textarea}></textarea>
            </div>
            <h2 ref={recentRecipesRef}>{NSFWtrigger ? "Recent Needs" : "Recent Recipes"}</h2>
            <ul>
                {
                    recipes.map((recipe,index)=>{
                        return(

                            <li  className={style.box} key={index}  onClick={()=>handleRecipeClick(recipe.id)}>
                                <span className={style.tp}></span>
                                <p>{recipe.title}</p>
                                <span className={style.bt}></span>
                            </li>
                        );
                    })
                }    
            </ul>
        </div>
    );

}