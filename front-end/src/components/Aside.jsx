import React from "react";
import { ImageBox } from "./ImageBox.jsx";
import { RecipeItem } from "./RecipeItem.jsx";
import style from "../style/Aside.module.css";



export function Aside({dispatch,aside,image})
{

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
                <button onClick={handleClick} className={style.button}>More</button>
                </div>
                
            
            </div>
        )


}