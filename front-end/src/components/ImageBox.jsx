import {useContext} from "react";
import { EditingContext } from "../utilities/editingContext.js";
import style from "../style/ImageBox.module.css";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";


gsap.registerPlugin(useGSAP);

export function ImageBox({ image, dispatch,type }) {

    const buttonRef=useRef();
    const shadowRef=useRef();
    const tl=useRef();
    const editingContext=useContext(EditingContext);

    const {contextSafe}=useGSAP(()=>{
        tl.current=gsap
        .timeline({paused:true},{defaults:{duration:0.5, ease:"none"}}).to(buttonRef.current,{
            x:10,
            y:15

        },"<").to(shadowRef.current,{
            x:0,
            y:0
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





    const handleImageChange = (event) => {

        const file=event.target.files[0];
        if (file) {
            const fileUrl = URL.createObjectURL(file);
            dispatch({
                type: `edited_${type}`,
                image: fileUrl,
                file: file
            });
        }
    };

    return (
        
        <div className={style.container}>
            {(image.publicId === null && editingContext && image.previewURL===null)
                ? <div className={style.placeholder}><p>PICTURE GOES HERE</p></div>
                : (image.previewURL || image.publicId)
                ? <img src={ image.previewURL || `https://res.cloudinary.com/dfgde179c/image/upload/${image.publicId}` } alt="Recipe Header" className={style.image} />
                : null
}
            <input  id={type} type="file"  accept="image/jpeg, image/png, image/jpg" onChange={handleImageChange} />
            <div className={editingContext ? style.labelContainer : `${style.labelContainer} ${style.none}`} onMouseEnter={onHover} onMouseLeave={onLeave}>
                    <label   htmlFor={type}>
                    <div className={style.label} ref={buttonRef}>
                    {image.publicId===null && image.previewURL===null ? <p   className={style.text}>Add Picture</p> : <p  className={style.text}>Change Picture</p>}
                    </div>
                    <div className={style.shadow} ref={shadowRef}>
                    {image.publicId===null && image.previewURL===null ? <p   className={style.text}>Add Picture</p> : <p  className={style.text}>Change Picture</p>}
                    </div>
                    </label>

            </div>
        </div>
    );
}