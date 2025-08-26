
import { InstructionsItem } from "./InstructionsItem.jsx";
import style from "../style/Insctructions.module.css";
import {useState} from "react";







export function Instructions({instructions,dispatch,NSFWtrigger})
{
   

    const handleClick=()=>{
        console.log("adding instruction");
        dispatch({
            type:"added_instruction"
        })
    }
    const handleDelete=(event)=>{
        console.log("deleteing instruction");
        dispatch({
            type:"deleted_instruction",
            index:event.target.index
        })
    }

    return (
        <div className={style.container}>
        {
            instructions.map((instruction,index)=>{
                
                return(
                    <InstructionsItem handleClick={(index===instructions.length-1) ? handleClick : handleDelete} lastFlag={(index!==instructions.length-1)} key={index} index={index} value={instruction.value} dispatch={dispatch} image={instruction.image} NSFWtrigger={NSFWtrigger}  />
                )
            })
        }
        </div>


    )    
}
