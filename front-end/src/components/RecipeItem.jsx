import { resizeTextArea } from "../utilities/resizeTextArea";
import style from "../style/RecipeItem.module.css";


export function RecipeItem({value, index, dispatch,type,NSFWtrigger}) {


    const handleChange=(event)=>{
        dispatch({
            type:`edited_${type}`,
            new_value:event.target.value,
            index:index
        })
        resizeTextArea(event);
    }
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
        <textarea value={value} onChange={handleChange} className={style.textarea} placeholder={type==="ingredient" ? ingredient :type==="aside" ? aside: instructions}>

        </textarea>
    );

}