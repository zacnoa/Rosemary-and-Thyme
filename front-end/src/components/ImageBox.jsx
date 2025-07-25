import React from "react";
import style from "../style/ImageBox.module.css";

export function ImageBox({ image, dispatch,type }) {
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
            {image===null? <div className={style.placeholder}></div> : <img src={image} alt="Recipe Header" className={style.image} />}
            <input  id={type} type="file"  accept="image/jpeg, image/png, image/jpg" onChange={handleImageChange} />
            <label for={type} className={style.label}>{image===null? <p className={style.text}>Add Picture</p> : <p className={style.text}>Change Picture</p>}</label>
        </div>
    );
}