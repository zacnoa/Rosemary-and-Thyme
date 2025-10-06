import {useRef} from "react";
import gsap from "gsap";
import {useGSAP} from "@gsap/react";
import { ImageBox } from "./ImageBox.jsx";
import { RecipeItem } from "./RecipeItem.jsx";
import style from "../style/Ingredients.module.css";

gsap.registerPlugin(useGSAP);

export function Ingredients({ingredients,dispatch,image,NSFWtrigger}) 
{

  if(!ingredients) console.log("No ingredients provided");
    const handleAdd=()=>{
        console.log("Adding ingredient");
        dispatch({
            type:"added_ingredient"

        });
    }
     const handleDelete=(event)=>{
        console.log("deleting ingredient");
        dispatch({
            type:"deleted_ingredient",
            index:event.target.index
        })
    }

  return (

    <div className={style.container}>
        <div className={style.ingredients}>
        <RecipeItem array={ingredients} dispatch={dispatch} type={"ingredient"} NSFWtrigger={NSFWtrigger} handleAdd={handleAdd} handleDelete={handleDelete} />
        </div>        
        <div className={style.imageContainer}>
        <ImageBox image={image} dispatch={dispatch} type={"ingredientsImage"}/>
        </div>
    
    
    </div>


  );
      
}