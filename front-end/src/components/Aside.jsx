import React from "react";
import { ImageBox } from "./ImageBox.jsx";
import { RecipeItem } from "./RecipeItem.jsx";



export function Aside({dispatch,aside,image})
{

        const handleClick=()=>{
            dispatch({
                type:"added_aside"
            });
        }


        return(
            <>
            {
                aside.map((item,index)=>
                    <RecipeItem key={index} index={index} value={item} dispatch={dispatch} type={"aside"} />
                )
            }
            <button onClick={handleClick}>More</button>
            <ImageBox image={image} dispatch={dispatch} type={"asideImage"}/>
            </>
        )


}