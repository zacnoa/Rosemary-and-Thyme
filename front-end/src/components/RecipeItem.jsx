import react from 'react';



export function RecipeItem({value, index, dispatch,type }) {


    const handleChange=(event)=>{
        dispatch({
            type:`edited_${type}`,
            new_value:event.target.value,
            index:index
        })
    }



return(
        <textarea value={value} onChange={handleChange}>

        </textarea>
    );

}