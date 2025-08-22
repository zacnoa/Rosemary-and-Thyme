
import {useGSAP} from "@gsap/react";
import gsap from "gsap";
import { RecipeItem } from "./RecipeItem.jsx";
import style from "../style/Aside.module.css";
import { Button } from "../components/Button.jsx";


gsap.registerPlugin(useGSAP);
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
                    aside.map((item,index)=>{
                        <div className={style.aside}  key={index}>
                            <div className={style.listbutton}><p className={style.number}>{index+1}</p></div>   
                            <div className={style.textarea}>
                                <RecipeItem index={index} value={item} dispatch={dispatch} type={"aside"} />    
                            </div>
                        </div>
                    })
                }
                <div  className={style.buttonContainer} >
                            <Button handleClick={handleClick} text={"More"} />
                </div>
                </div>
                
            
            </div>
        )


}