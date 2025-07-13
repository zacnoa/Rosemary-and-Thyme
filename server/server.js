const express=require("express");
const app=express();
const cors=require("cors");
const corsOptions={
    origin:"http://localhost:5173",

};
app.use(cors(corsOptions));


app.get("/hello",(req,res)=>{
    const result={"message":"HelloWorld!"}
    res.json(result);
});


app.listen(4000,()=>{
    console.log("Server is running on port 4000");
});