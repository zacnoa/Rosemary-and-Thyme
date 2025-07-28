import {useRef} from "react";
import {useGSAP} from "@gsap/react";
import gsap from "gsap";
import { RecipeItem } from "./RecipeItem.jsx";
import style from "../style/Aside.module.css";
import style1 from "../style/Ingredients.module.css";


gsap.registerPlugin(useGSAP);
export function Aside({dispatch,aside,image})
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
                type:"added_aside"
            });
        }


        return(
            <div className={style.container}>
                <div className={style.asidecontainer}>
                {
                    aside.map((item,index)=>
                        <div className={style.aside}>
                            <div className={style.listbutton}><p className={style.number}>{index+1}</p></div>   
                            <div className={style.textarea}>
                                <RecipeItem key={index} index={index} value={item} dispatch={dispatch} type={"aside"} />    
                            </div>
                        </div>
                    )
                }
                <div onClick={handleClick} onMouseEnter={onHover} onMouseLeave={onLeave} className={style1.buttonContainer} >
                            <div ref={buttonRef} className={style1.button}><p>More</p></div>
                            <div  ref={shadowRef} className={style1.shadow}><p>More</p></div>
                </div>
                </div>
                
            
            </div>
        )


}