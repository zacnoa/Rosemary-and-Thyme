
import{RecipeItem} from "./RecipeItem.jsx";
import style from "../style/InstructionsItem.module.css"
import {Button} from "../components/Button.jsx";


export function InstructionsItem({value,dispatch,index,handleClick})
{

    return(
            <div className={style.container}>   
                <RecipeItem key={index} index={index} value={value} dispatch={dispatch} type={"instruction"} />
                <div  className={style.buttonContainer}>
                    <Button handleClick={handleClick} text={"Next Step"}/>
                </div>
            </div>
    );
}

