import react from "react";
import {InputArea} from "./InputArea.jsx";
import {ImageBox} from "./ImageBox.jsx";
import style from "../style/TitleDescription.module.css";


export function TitleDescription ({title,description,dispatch,image}){

    
    



    return(
        <div className={style.container}>
            <div className={style.titleDescription}>
                <InputArea value={title} dispatch={dispatch} type={"title"} />
                <InputArea value={description} dispatch={dispatch} type={"description"}/>
            </div>
            <div className={style.imageContainer}>
            <ImageBox image={image} dispatch={dispatch} type={"headerImage"}/>
            </div>
        </div>

    )
};