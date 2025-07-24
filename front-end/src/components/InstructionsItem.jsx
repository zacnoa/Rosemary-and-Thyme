import react from "react";
import{RecipeItem} from "./RecipeItem.jsx";
import style from "../style/InstructionsItem.module.css";



export function InstructionsItem({index,value,dispatch,type,image})
{

    const handleImageChange=(event)=>{
        const file=event.target.files[0];
        if(file)
        {
            const fileUrl=URL.createObjectURL(file);
            dispatch({
                type:"edited_instructionsImage",
                image:fileUrl,
                index: index
            })
        }
    }



    return(
        <>
        
            <RecipeItem key={index} index={index} value={value} dispatch={dispatch} type={"instruction"} />
            {image && <img src={image} alt="Preview" />}
            <input type="file" accept="image/jpeg, image/png, image/jpg" onChange={handleImageChange} />
        
        </>
    );
}

