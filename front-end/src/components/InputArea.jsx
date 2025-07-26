
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import style from '../style/InputArea.module.css';

gsap.registerPlugin(useGSAP)

export function InputArea({value,dispatch,type}){

    const textareaRef=useRef();
    const {contextSafe} =useGSAP(()=>{
        textareaRef.current.timeline=gsap.timeline({paused:true})
        .to(textareaRef.current,{
            duration:0.75,
            boxShadow:"22px -24px 0px #CB625F",
            ease:"power4.in",
        })
    });
 
    
    const onFocus=contextSafe(()=>{
        textareaRef.current.timeline.play();
    });
    const onBlur=contextSafe(()=>{
        textareaRef.current.timeline.reverse();
    });




    const handleChange=(event)=>{
        console.log("InputArea",type);
        console.log(value)
        
            dispatch({
                type:`edited_${type}`,
                new_value:event.target.value
            });
        
        
    }


    return(
        <textarea ref={textareaRef} onFocus={onFocus} onBlur={onBlur} className={style.textarea} value={value} onChange={handleChange}>

        </textarea>
    );



};