export const initialState={
    title:"",
    description:"",
    headerImage:{publicId:null,previewURL:null, file:null},
    ingredientsImage:{publicId:null,previewURL:null, file:null},
    ingredients:[""],
    instructions:[{value:"",image:{publicId:null,previewURL:null, file:null}}],
    aside:[""],
};


export function RecipeReducer(state,action){
        switch(action.type){

            case "edited_title": {
                return{
                    ...state,
                    title:action.new_value
                }
            }
            case "edited_description":{
                return{
                    ...state,
                    description:action.new_value
                }
            }
            case "edited_headerImage":{
                return{
                    ...state,
                    headerImage:{...state.headerImage,previewURL:action.image,file:action.file}
                }
            }
            case "added_ingredient":{
                return{
                    ...state,
                    ingredients:[...state.ingredients,""]
                }
            }
            case "edited_ingredientsImage":{
                return{
                    ...state,
                    ingredientsImage:{...state.ingredientsImage,previewURL:action.image,file:action.file}
                }
            }

            case "edited_ingredient":{
                const newIngredients=[...state.ingredients];
                newIngredients[action.index]=action.new_value;
                return{
                    ...state,
                    ingredients:newIngredients
                }
            }
            case "edited_instruction":{
                const newInstructions=[...state.instructions];
                newInstructions[action.index].value=action.new_value;
                return{
                    ...state,
                    instructions:newInstructions
                }
            }
            case "added_instruction":{
                return{
                    ...state,
                    instructions:[...state.instructions,{value:"",image:{publicId:null,previewURL:null, file:null}}]
                }
            }
            case "deleted_instruction":{
                const newInstructions=[...state.instructions];
                newInstructions.splice(action.index,1);
                return{
                    ...state,
                    instructions:newInstructions
                }
            }
            case "edited_instructionsImage":{
                const newInstructions=[...state.instructions];
                newInstructions[action.index].image={...newInstructions[action.index].image,previewURL:action.image,file:action.file};
                return{
                    ...state,
                    instructions:newInstructions
                }
            }
            
            case "edited_aside":{
                const newAside=[...state.aside];
                newAside[action.index]=action.new_value;
                return{
                    ...state,
                    aside:newAside
                }            
            }
            case "added_aside":{
                return{
                    ...state,
                    aside:[...state.aside,""]
                }
            }
            case "deleted_aside":{
                const newAside=[...state.aside];
                newAside.splice(action.index,1)
                return {
                    ...state,
                    aside:newAside

                }
            }

            case "reset":{
                return initialState;
            }
            case "set_recipe":{
                return action.object
            }

            default:{
                return state;
            }



            
        }
}

