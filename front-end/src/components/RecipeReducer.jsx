export const initialState={
    title:"",
    description:"",
    headerImage:"",
    ingredientsImage:"",
    ingredients:[],
    instructions:"",
    aside:[]
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

            default:{
                return state;
            }



            
        }
}

