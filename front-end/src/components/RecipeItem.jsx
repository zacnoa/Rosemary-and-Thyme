
import style from "../style/RecipeItem.module.css";
import { AutoResizeTextArea } from "./AutoResizeTextArea";
import {Button} from "../components/Button.jsx"


export function RecipeItem({array, dispatch,type,NSFWtrigger,handleAdd,handleDelete}) {

        if(!array) console.log("array is null");
   
    let ingredient="";
    let aside="";
    let instructions="";

    if(NSFWtrigger)
    {
        ingredient="What Gets You Off?";
        aside="Tell Me You Love Me";
        instructions="How Do You Like It?";
    }
    else
    {
        ingredient="What Do You Need?";
        aside="What Else Do You Need?";
        instructions="How Do You Need It?"  
    }
    



return(
        <div className={style.container}>
         {
             array.map((item,index) => {
                 return (
                    <div className={style.inputContainer} key={index}>
                        <AutoResizeTextArea  index={index} value={item}  dispatch={dispatch} NSFWtrigger={NSFWtrigger} type={type}/>
                        <div  className={style.buttonContainer}>
                            <Button handleClick={(index===array.length-1) ? handleAdd : handleDelete} text={index!==array.length-1 ? "Delete Step": "Next Step"}/>
                        </div>
                    </div>
                 );
             })
             
         }
         </div>
    );

}