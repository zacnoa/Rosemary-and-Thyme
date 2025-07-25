import react from "react";
import { ImageBox } from "./ImageBox.jsx";
import { RecipeItem } from "./RecipeItem.jsx";
import { InstructionsItem } from "./InstructionsItem.jsx";
import style from "../style/Insctructions.module.css";


export function Instructions({instructions,dispatch})
{

    
    const handleClick=()=>{
        dispatch({
            type:"added_instruction"
        })
    }

    return (
        <div className={style.container}>
        {
            instructions.map((instruction,index)=>{
                return(
                    <InstructionsItem key={index} index={index} value={instruction.value} dispatch={dispatch} image={instruction.image}/ >
                )
            })
        }
        <button onClick={handleClick} className={style.button}>Add step</button>
        </div>


    )
}
