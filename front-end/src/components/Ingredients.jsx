import react from "react";
import { ImageBox } from "./ImageBox.jsx";
import { RecipeItem } from "./RecipeItem.jsx";
import style from "../style/Ingredients.module.css";



export function Ingredients({ingredients,dispatch,image})
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
                <RecipeItem  key={index} index={index} value={ingredient} dispatch={dispatch} type={"ingredient"} />
                )
            }
            <button onClick={handleClick} className={style.button}>Add ingredient</button>
        </div>

        <ImageBox image={image} dispatch={dispatch} type={"ingredientsImage"}/>
    
    
    </div>


  );
      
}