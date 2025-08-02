export const initialState={
    title:"",
    description:"",
    headerImage:null,
    ingredientsImage:null,
    ingredients:[""],
    instructions:[{value:"",image:null}],
    aside:[""],
    asideImage:null
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
                    headerImage:action.image
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
                    ingredientsImage:action.image
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
                    instructions:[...state.instructions,{value:"",image:null}]
                }
            }
            case "edited_instructionsImage":{
                const newInstructions=[...state.instructions];
                newInstructions[action.index].image=action.image
                return{
                    ...state,
                    instructions:newInstructions
                }
            }
            case "edited_asideImage":{
                return{
                    ...state,
                    asideImage:action.image
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

            case "reset":{
                return initialState;
            }
            case "request_recipe":{
                return action.object
            }

            default:{
                return state;
            }



            
        }
}

