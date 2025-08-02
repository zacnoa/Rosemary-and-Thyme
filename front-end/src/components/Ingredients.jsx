import {useRef} from "react";
import gsap from "gsap";
import {useGSAP} from "@gsap/react";
import { ImageBox } from "./ImageBox.jsx";
import { RecipeItem } from "./RecipeItem.jsx";
import style from "../style/Ingredients.module.css";

gsap.registerPlugin(useGSAP);

export function Ingredients({ingredients,dispatch,image})
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
        console.log("Adding ingredient");
        dispatch({
            type:"added_ingredient"

        });
    }

  return (

    <div className={style.container}>
        <div className={style.ingredients}>
            {
                ingredients.map((ingredient,index)=>
                <RecipeItem  key={index} index={index} value={ingredient} dispatch={dispatch} type={"ingredient"} />
                )
            }
            <div onClick={handleClick} onMouseEnter={onHover} onMouseLeave={onLeave} className={style.buttonContainer} >
                <div ref={buttonRef} className={style.button}><p>Add Ingredient</p></div>
                <div  ref={shadowRef} className={style.shadow}><p>Add Ingredient</p></div>
            </div>
        </div>
        <div className={style.imageContainer}>
        <ImageBox image={image} dispatch={dispatch} type={"ingredientsImage"}/>
        </div>
    
    
    </div>


  );
      
}