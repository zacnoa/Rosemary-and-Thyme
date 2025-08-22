
import style from "../style/RecipeItem.module.css";
import {AutoResizeTextArea} from "../components/AutoResizeTextArea.jsx"
import { Button } from "./Button";


export function RecipeItem({array=[], dispatch,type,NSFWtrigger,handleClick}) {



return (
        <div className={style.container}>
            {
                    
                array.map((item,index)=>{
                    return(
                        <AutoResizeTextArea index={index} key={`${type}-${index}`}  value={item.value} dispatch={dispatch} NSFWtrigger={NSFWtrigger}/>
                    )
                })   
            }
            
            <div  className={style.buttonContainer}>
                <Button handleClick={handleClick} text={"Next Step"}/>
            </div>
        </div>
    );

}