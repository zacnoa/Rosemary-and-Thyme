const express=require("express");
const app=express();
const cors=require("cors");
const corsOptions={
    origin:"http://localhost:5173",

};


const recipesID={};
const recipes={};

app.use(cors(corsOptions));
app.use(express.json());


app.post("/recipe",(req,res)=>{
    const id=Date.now();
    const newRecipe={id,...req.body}

    recipes[id]=newRecipe;
    recipesID[id]={id, title:newRecipe.title};

    console.log("Recipe receiver:",newRecipe);
    res.status(200).send(newRecipe);
});



app.get("/recipes",(req,res)=>{
    res.status(200).json(Object.values(recipesID))
})
app.get("/recipe/:id",(req,res)=>{
    const id=req.params.id;
    if(recipes[id]){
        res.status(200).json(recipes[id]);
    }
})



app.listen(4000,()=>{
    console.log("Server is running on port 4000");
});