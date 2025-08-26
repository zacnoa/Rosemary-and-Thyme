
import {useGSAP} from "@gsap/react";
import gsap from "gsap";
import { RecipeItem } from "./RecipeItem.jsx";
import style from "../style/Aside.module.css";
import { Button } from "../components/Button.jsx";


gsap.registerPlugin(useGSAP);
export function Aside({dispatch,aside})
{



        const handleClick=()=>{
            dispatch({
                type:"added_aside"
            });
        }


        return(
            <div className={style.container}>
                <div className={style.asidecontainer}>
                    <RecipeItem array={aside} dispatch={dispatch} type={"aside"} handleClick={handleClick} />
                </div>
                
            
            </div>
        )


}