import { resizeTextArea } from "../utilities/resizeTextArea";
import style from "../style/AutoResizeTextArea.module.css";
import {useEffect,useRef} from "react";
import {useContext} from "react";
import { EditingContext } from "../utilities/editingContext.js";







export function AutoResizeTextArea({index,value,NSFWtrigger,type,dispatch}) 
{
    
    const editingContext=useContext(EditingContext);
    const textAreaRef = useRef();

    useEffect(()=>{
        resizeTextArea(textAreaRef.current);
    },[value])

    
    const handleChange=(event)=>{
        console.log(event.target.value);
        dispatch({
            type:`edited_${type}`,
            new_value:event.target.value,
            index:index
        })
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


        return (
        <textarea ref={textAreaRef} readOnly={!editingContext} value={value} onChange={handleChange} className={style.textarea} placeholder={type==="ingredient" ? ingredient :type==="aside" ? aside: instructions}>
        </textarea>
        )
}