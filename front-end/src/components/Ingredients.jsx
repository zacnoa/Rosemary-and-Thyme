import react from "react";
import { ImageBox } from "./ImageBox.jsx";
import { RecipeItem } from "./RecipeItem.jsx";




export function Ingredients({ingredients,dispatch,image})
{

    const handleClick=()=>{
        console.log("Adding ingredient");
        dispatch({
            type:"added_ingredient"

        });
    }

  return (

    <>
        {
            ingredients.map((ingredient,index)=>
            <RecipeItem  key={index} index={index} value={ingredient} dispatch={dispatch} type={"ingredient"} />
            )
        }
        <button onClick={handleClick}>Add ingredient</button>
        <ImageBox image={image} dispatch={dispatch} type={"ingredientsImage"}/>
    
    
    </>


  );
      
}