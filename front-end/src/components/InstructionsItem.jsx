import react from "react";
import{RecipeItem} from "./RecipeItem.jsx";
import style from "../style/InstructionsItem.module.css";



export function InstructionsItem({index,value,dispatch,image})
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
            <div>
                <div className={style.container}>
                    <div className={style.listbutton}><p className={style.number}>{index+1}</p></div>
                    <div className={style.textarea}>
                    <RecipeItem key={index} index={index} value={value} dispatch={dispatch} type={"instruction"} />
                    </div>
                    <label for={index} className={style.label}>{image===null? <p className={style.text}>Add Picture</p> : <p className={style.text}>Change Picture</p>}</label>
                </div>
                <img src={image} className={style.image}/>
            </div>
            
            <input  id={index} type="file" accept="image/jpeg, image/png, image/jpg" onChange={handleImageChange} />
         
        </>
    );
}

