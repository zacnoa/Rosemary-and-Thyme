
import "./loadEnvironment.js";
import express from "express";
import cors from "cors";

import recipesRoutes from "./routes/recipes.js";
const app=express();
const corsOptions={
    origin:["http://localhost:5173", "https://rosemary-and-thyme-front-end.vercel.app"],

};

const PORT=process.env.PORT || 4000;



app.use(cors(corsOptions));
app.use(express.json());



app.use("/recipes",recipesRoutes);






app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});