
import style from "../style/RecipeItem.module.css";
import { AutoResizeTextArea } from "./AutoResizeTextArea";
import {Button} from "../components/Button.jsx"


export function RecipeItem({array, dispatch,type,NSFWtrigger,handleClick}) {

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
                     <AutoResizeTextArea key={index} index={index} value={item}  dispatch={dispatch} NSFWtrigger={NSFWtrigger} type={type}/>
                 );
             })
         }
        <div  className={style.buttonContainer}>
            <Button handleClick={handleClick} text={"Next Step"}/>
        </div>
         </div>
    );

}