import react from "react";
import {InputArea} from "./InputArea.jsx";
import {ImageBox} from "./ImageBox.jsx";


export function TitleDescription ({title,description,dispatch,image}){

    
    



    return(
        <>
            <InputArea value={title} dispatch={dispatch} type={"title"} />
            <InputArea value={description} dispatch={dispatch} type={"description"}/>
            <ImageBox image={image} dispatch={dispatch} type={"headerImage"}/>
        </>

    )
};