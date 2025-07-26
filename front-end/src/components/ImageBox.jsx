import React from "react";
import style from "../style/ImageBox.module.css";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";


gsap.registerPlugin(useGSAP);

export function ImageBox({ image, dispatch,type }) {

    const buttonRef=useRef();
    const {contextSafe} =useGSAP();

    const onHover=contextSafe(()=>{
        gsap.to(buttonRef.current,{
            borderRight:"18px solid #67C2D4",
            borderTop:"13px solid #67C2D4",  
            borderBottom:"12px solid #67C2D4",
            borderLeft:"4px solid #67C2D4",
            duration:0.25,
         
        });
    });
    const onLeave=contextSafe(()=>{
        gsap.set(buttonRef.current,{
        borderRight:"8px solid #67C2D4",
        borderTop:"8px solid #67C2D4",  
        borderBottom:"4px solid #67C2D4",
        borderLeft:"4px solid #67C2D4",
        });
    });





    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const fileUrl = URL.createObjectURL(file);
            dispatch({
                type: `edited_${type}`,
                image: fileUrl
            });
        }
    };

    return (
        <div className={style.container}>
            {image===null? <div className={style.placeholder}><p>PICTURE GOES HERE</p></div> : <img src={image} alt="Recipe Header" className={style.image} />}
            <input  id={type} type="file"  accept="image/jpeg, image/png, image/jpg" onChange={handleImageChange} />
            <label ref={buttonRef} onMouseEnter={onHover} onMouseLeave={onLeave} for={type} className={style.label}>{image===null? <p className={style.text}>Add Picture</p> : <p className={style.text}>Change Picture</p>}</label>
        </div>
    );
}