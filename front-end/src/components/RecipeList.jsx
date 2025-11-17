import {useEffect,useState,useRef} from "react";
import axios from "axios";
import style from "../style/RecipeList.module.css";
import {gsap} from "gsap";
import {useGSAP} from "@gsap/react";
import { RoughEase } from "gsap/EasePack";
import _ from "lodash";
import { Link } from "react-router-dom";
import { API_URL } from "../utilities/API_URL.js";

gsap.registerPlugin(useGSAP, RoughEase);



export function RecipeList({dispatch,refreshTrigger,isSidebarOpen,NSFWtrigger})

{


   


    const [recipes,setRecipes]=useState([]);
    const [searchResults,setSearchResults]=useState([]);
    const [isSearching,setIsSearching]=useState(false);
    const fetchRecipes=()=>
    {
        axios.get(`${API_URL}/recipes`)
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
    
    const handleRecipeClick=_id=>{
        axios.get(`${API_URL}/recipes/${_id}`)
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
    const debouncedSearch = _.debounce((value) => {
        axios.get(`${API_URL}/recipes/search?q=${value}`)
          .then(response => setSearchResults(response.data))
          .catch(error => console.error("Error fetching search results:", error));
          console.log(searchResults);
      }, 400);
      
    const handleSearch = (event) => {
        const value = event.target.value;
        if (value.length >= 3) {
            debouncedSearch(value);
        } else {
            setSearchResults([]);
        }
    };

    return(
        <div className={style.recipelist}>
            <div className={style.search}>
                <label htmlFor="search">What do you desire?</label>
                <textarea id="search"  ref={textAreaRef} className={style.textarea} onChange={handleSearch} onFocus={() => setIsSearching(true)} onBlur={() => setIsSearching(false)}></textarea>
            </div>
            <h2 ref={recentRecipesRef}>{NSFWtrigger ? "Recent Needs" : "Recent Recipes"}</h2>
            <ul>
                {
                    (isSearching ? searchResults : recipes).map((recipe)=>{
                        return(

                            <li  className={style.box} key={recipe._id}  onClick={()=>handleRecipeClick(recipe._id)}>
                                <span className={style.tp}></span>
                                <Link to={`/recipes/${recipe._id}`}>
                                    <p>{recipe.title}</p>
                                </Link>
                                <span className={style.bt}></span>
                                </li>
                        );
                    })
                }    
            </ul>
        </div>
    );

}