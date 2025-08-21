
import { InstructionsItem } from "./InstructionsItem.jsx";
import style from "../style/Insctructions.module.css";
import { Button } from "../components/Button.jsx";







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
                    <InstructionsItem key={index} index={index} value={instruction.value} dispatch={dispatch} image={instruction.image}  />
                )
            })
        }
        <div  className={style.buttonContainer}>
            <Button handleClick={handleClick} text={"Next Step"}/>
        </div>
        </div>


    )    
}
