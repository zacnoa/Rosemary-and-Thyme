import react from "react";
import style from '../style/InputArea.module.css';



export function InputArea({value,dispatch,type}){

    const handleChange=(event)=>{
        console.log("InputArea",type);
        console.log(value)
       
            dispatch({
                type:`edited_${type}`,
                new_value:event.target.value
            });
        
        
    }


    return(
        <textarea className={style.textarea} value={value} onChange={handleChange}>

        </textarea>
    );



};