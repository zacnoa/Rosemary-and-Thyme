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

    const handleClick=()=>{
        console.log("Adding ingredient");
        dispatch({
            type:"added_ingredient"

        });
    }

  return (

    <div className={style.container}>
        <div className={style.ingredients}>
            {
                ingredients.map((ingredient,index)=>
                <RecipeItem  key={index} index={index} value={ingredient} dispatch={dispatch} type={"ingredient"} NSFWtrigger={NSFWtrigger} />
                )
            }
            <div className={style.buttonContainer} >
                <Button handleClick={handleClick} text={"Add Ingredient"} />
            </div>
        </div>
        <div className={style.imageContainer}>
        <ImageBox image={image} dispatch={dispatch} type={"ingredientsImage"}/>
        </div>
    
    
    </div>


  );
      
}