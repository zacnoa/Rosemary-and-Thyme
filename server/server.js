
import "./loadEnvironment.js";
import express from "express";
import cors from "cors";
import db from "./db/conn.js";
import recipesRoutes from "./routes/recipes.js";
const app=express();
const corsOptions={
    origin:"http://localhost:5173",

};

const PORT=process.env.PORT || 4000;
const recipesID={};
const recipes={};

app.use(cors(corsOptions));
app.use(express.json());


app.use("/recipes",recipesRoutes);



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



app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});