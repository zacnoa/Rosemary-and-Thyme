import react from "react";



export function InputArea({value,dispatch,type}){

    const handleChange=(event)=>{
        console.log("InputArea",type);
        console.log(value)
       
            dispatch({
                type:`edited_${type}`,
                new_value:event.target.value
            });
        
        
    }


    return(
        <textarea value={value} onChange={handleChange}>

        </textarea>
    );



};