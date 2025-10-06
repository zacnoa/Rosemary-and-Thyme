
import {useGSAP} from "@gsap/react";
import gsap from "gsap";
import { RecipeItem } from "./RecipeItem.jsx";
import style from "../style/Aside.module.css";


gsap.registerPlugin(useGSAP);
export function Aside({dispatch,aside})
{



        const handleAdd=()=>{
            dispatch({
                type:"added_aside"
            });
        }
        const handleDelete=(event)=>{
            dispatch({
                type:"deleted_aside",
                index:event.target.index
            })
        }


        return(
            <div className={style.container}>
                <div className={style.asidecontainer}>
                    <RecipeItem array={aside} dispatch={dispatch} type={"aside"} handleAdd={handleAdd} />
                </div>
                
            
            </div>
        )


}