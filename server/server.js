const express=require("express");
const app=express();
const cors=require("cors");
const corsOptions={
    origin:"http://localhost:5173",

};


 const test={
    title:"aaa",
    description:"aa",
    headerImage:"aa",
    ingredientsImage:"aa",
    ingredients:["aaaa","ssss"],
    instructions:[{value:"aaaa",image:""}],
    aside:["aaaa"],
    asideImage:""
};


const recipes=[];
recipes.push(test);

app.use(cors(corsOptions));
app.use(express.json());


app.post("/recipe",(req,res)=>{
    
    recipes.push(req.body);
    console.log("Recipe receiver:",req.body);
    res.status(200).send(req.body);
});

app.get("/recipe",(req,res)=>{
    res.send(recipes[1]);
})


app.listen(4000,()=>{
    console.log("Server is running on port 4000");
});