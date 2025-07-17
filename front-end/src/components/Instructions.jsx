import react from "react";
import { ImageBox } from "./ImageBox.jsx";
import { RecipeItem } from "./RecipeItem.jsx";
import { InstructionsItem } from "./InstructionsItem.jsx";


export function Instructions({instructions,dispatch})
{

    
    const handleClick=()=>{
        dispatch({
            type:"added_instruction"
        })
    }

    return (
        <>
        {
            instructions.map((instruction,index)=>{
                return(
                    <InstructionsItem key={index} index={index} value={instruction.value} dispatch={dispatch} image={instruction.image}/ >
                )
            })
        }
        <button onClick={handleClick}>Add step</button>
        </>


    )
}
