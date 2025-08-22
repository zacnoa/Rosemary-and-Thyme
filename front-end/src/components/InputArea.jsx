import { resizeTextArea } from "../utilities/resizeTextArea";   
import { useRef,useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import style from '../style/InputArea.module.css';

gsap.registerPlugin(useGSAP)

export function InputArea({value,dispatch,type}){

    const textareaRef=useRef();
    const {contextSafe} =useGSAP();
 
    
    const onFocus=contextSafe(()=>{
        gsap.to(textareaRef.current,{
            duration:0.5,
            boxShadow:"22px -24px 0px #CB625F",
        })
    });
    const onBlur=contextSafe(()=>{
        gsap.to(textareaRef.current,{
            duration:0.5,
            boxShadow:"22px 24px 0px #CB625F",
        })
    });



    useEffect(()=>{
        resizeTextArea(textareaRef.current);
    }, [value])
    const handleChange=(event)=>{
        console.log("InputArea",type);
        console.log(value)
        
            dispatch({
                type:`edited_${type}`,
                new_value:event.target.value
            });
        
        
    }


    return(
        <textarea ref={textareaRef} onFocus={onFocus} onBlur={onBlur} className={`${style.textarea} ${type==="title" ? style.title : style.description}`} value={value} onChange={handleChange} placeholder={type==="title" ? "Title..." : "Description..."}>

        </textarea>
    );



};