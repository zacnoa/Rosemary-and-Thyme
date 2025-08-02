import gsap from "gsap";
import {useRef} from "react";
import {useGSAP} from "@gsap/react";
import { InstructionsItem } from "./InstructionsItem.jsx";
import style from "../style/Insctructions.module.css";






export function Instructions({instructions,dispatch})
{


     const buttonRef=useRef();
    const shadowRef=useRef();
    const tl=useRef();

    const {contextSafe} =useGSAP(()=>{
        tl.current=gsap
        .timeline({paused:true},{defaults:{duration:0.5, ease:"none"}}).to(buttonRef.current,{
            top:10,
            left:-10
            
        },"<").to(shadowRef.current,{
            top:0,
            left:0
        },"<").to([buttonRef.current,shadowRef.current],{
            backgroundColor:"#9a9299",
            duration:0.25,
            color:"#9a9299"
        },"<").set(shadowRef.current,{
            zIndex:2
        },">")
        .to(shadowRef.current,{
            backgroundColor:"#67C2D4",
            duration:0.25,
            color:"#FFFFFF"
    
        },"<").to(buttonRef.current,{
            backgroundColor:"#FFFFFF",
            duration:0.25,
            color:"#FFFFFF"
        },"<")
    });

    const onHover=contextSafe(()=>{
        tl.current.play();
    });
    const onLeave=contextSafe(()=>{
        tl.current.reverse();
    });






    
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
                    <InstructionsItem key={index} index={index} value={instruction.value} dispatch={dispatch} image={instruction.image}/ >
                )
            })
        }
        <div onClick={handleClick} onMouseEnter={onHover} onMouseLeave={onLeave} className={style.buttonContainer}>
            <div ref={buttonRef} className={style.button}><p>Next Step</p></div>
            <div  ref={shadowRef} className={style.shadow}><p>Next Step</p></div>
        </div>
        </div>


    )    
}
