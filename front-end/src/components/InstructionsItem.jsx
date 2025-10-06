import {useGSAP} from "@gsap/react";
import {useRef,useContext} from "react";
import gsap from "gsap";
import style from "../style/InstructionsItem.module.css"
import {AutoResizeTextArea} from "../components/AutoResizeTextArea"
import {Button} from "../components/Button"
import { EditingContext } from "../utilities/editingContext.js";


gsap.registerPlugin(useGSAP);

export function InstructionsItem({index,value,dispatch,image,handleClick,NSFWtrigger,lastFlag})
{


    const buttonRef=useRef();
    const shadowRef=useRef();
    const tl=useRef();
    const editing=useContext(EditingContext);

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
                index: index,
                file: file
            })
        }
    }



    return(
                <div className={style.container}>   
                    <div className={style.textarea}>
                    <div  className={style.listbutton}><p className={style.number}>{index+1}</p></div>
                    <div className={style.inputContainer}>
                        <AutoResizeTextArea value={value} dispatch={dispatch} index={index} type={"instruction"} NSFWtrigger={NSFWtrigger} />
                        <div className={style.buttonContainer}>
                            <Button handleClick={handleClick} text={lastFlag ? "Delete Step": "Next Step"}/>
                        </div>
                    </div>

                    <div className={editing ? style.labelContainer : style.none}  onMouseEnter={onHover} onMouseLeave={onLeave}>
                        <label   htmlFor={index}>
                            <div className={style.label} ref={buttonRef}>
                                {image.publicId===null && image.previewURL===null ? <p   className={style.text}>Add Picture</p> : <p  className={style.text}>Change Picture</p>}
                            </div>
                            <div className={style.shadow} ref={shadowRef}>
                                {image.publicId===null && image.previewURL===null ? <p   className={style.text}>Add Picture</p> : <p  className={style.text}>Change Picture</p>}
                            </div>
                        </label>
                    </div>
                </div>
                    {image.previewURL===null && image.publicId === null ? null : <img src={image.previewURL || `https://res.cloudinary.com/dfgde179c/image/upload/${image.publicId}`} className={style.image}/>}
                    <input  id={index} type="file" accept="image/jpeg, image/png, image/jpg" onChange={handleImageChange} />
                </div>
                
                    



        
            
         
    );
}

