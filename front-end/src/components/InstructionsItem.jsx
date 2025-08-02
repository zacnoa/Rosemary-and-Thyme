import {useGSAP} from "@gsap/react";
import {useRef} from "react";
import gsap from "gsap";
import{RecipeItem} from "./RecipeItem.jsx";
import style from "../style/InstructionsItem.module.css"
import style1 from "../style/ImageBox.module.css";


gsap.registerPlugin(useGSAP);

export function InstructionsItem({index,value,dispatch,image})
{


    const buttonRef=useRef();
    const shadowRef=useRef();
    const tl=useRef();

    const {contextSafe} =useGSAP(()=>{
        tl.current=gsap
        .timeline({paused:true},{defaults:{duration:0.5, ease:"none"}}).to(buttonRef.current,{
            top:15,
            left:10
            
        },"<").to(shadowRef.current,{
            top:0,
            left:0
        },"<").to([buttonRef.current,shadowRef.current],{
            backgroundColor:"#9ad6e2",
            duration:0.25,
            color:"#9ad6e2"
        },"<").set(shadowRef.current,{
            zIndex:2
        },">")
        .to(shadowRef.current,{
            backgroundColor:"#67C2D4",
            duration:0.25,
            color:"#CB625F"
    
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





    const handleImageChange=(event)=>{
        const file=event.target.files[0];
        if(file)
        {
            const fileUrl=URL.createObjectURL(file);
            dispatch({
                type:"edited_instructionsImage",
                image:fileUrl,
                index: index
            })
        }
    }



    return(
                <div className={style.container}>   
                    <div className={style.textarea}>
                    <div className={style.listbutton}><p className={style.number}>{index+1}</p></div>
                    <RecipeItem key={index} index={index} value={value} dispatch={dispatch} type={"instruction"} />
                    
                    <div className={style.labelContainer}  onMouseEnter={onHover} onMouseLeave={onLeave}>
                        <label   htmlFor={index}>
                            <div className={style.label} ref={buttonRef}>
                                {image===null? <p   className={style.text}>Add Picture</p> : <p  className={style.text}>Change Picture</p>}
                            </div>
                            <div className={style.shadow} ref={shadowRef}>
                                {image===null? <p   className={style.text}>Add Picture</p> : <p  className={style.text}>Change Picture</p>}
                            </div>
                        </label>
                    </div>
                </div>
                    <img src={image} className={style.image}/>
                    <input  id={index} type="file" accept="image/jpeg, image/png, image/jpg" onChange={handleImageChange} />
                </div>
                
                    



        
            
         
    );
}

