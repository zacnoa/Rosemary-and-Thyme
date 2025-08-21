import gsap from "gsap";
import {useRef} from "react";
import {useGSAP} from "@gsap/react";
import style from "../style/Button.module.css";


export function Button({handleClick,text})
{
    

    const buttonRef=useRef();
    const shadowRef=useRef();
    const tl=useRef();

    const {contextSafe} =useGSAP(()=>{
        tl.current=gsap
        .timeline({paused:true},{defaults:{duration:0.5, ease:"none"}}).to(buttonRef.current,{
            x:-10,
            y:10
            
        },"<").to(shadowRef.current,{
            x:0,
            y:0
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


    return(
        <div onClick={handleClick} onMouseEnter={onHover} onMouseLeave={onLeave} className={style.buttonContainer} >
            <div ref={buttonRef} className={style.button}><p>{text}</p></div>
            <div  ref={shadowRef} className={style.shadow}><p>{text}</p></div>
        </div>
    )
}