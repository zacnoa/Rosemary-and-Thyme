import {useRef} from "react";
import gsap from "gsap";
import {useGSAP} from "@gsap/react";
import { ImageBox } from "./ImageBox.jsx";
import { RecipeItem } from "./RecipeItem.jsx";
import style from "../style/Ingredients.module.css";
import {Button} from "../components/Button.jsx"

gsap.registerPlugin(useGSAP);

export function Ingredients({ingredients,dispatch,image,NSFWtrigger}) 
{

  if(!ingredients) console.log("No ingredients provided");
    const handleClick=()=>{
        console.log("Adding ingredient");
        dispatch({
            type:"added_ingredient"

        });
    }

  return (

    <div className={style.container}>
        <div className={style.ingredients}>
        <RecipeItem array={ingredients} dispatch={dispatch} type={"ingredient"} NSFWtrigger={NSFWtrigger} handleClick={handleClick} />
        </div>        
        <div className={style.imageContainer}>
        <ImageBox image={image} dispatch={dispatch} type={"ingredientsImage"}/>
        </div>
    
    
    </div>


  );
      
}