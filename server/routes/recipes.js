import db from "../db/conn.js";
import express from "express";
import { ObjectId } from "mongodb";


const router=express.Router();


router.get("/", async (req,res)=>{
    let collection=  db.collection("recipes");
    let results= await collection.find({}).limit(5).toArray();
    res.send(results).status(200);

})
router.get("/:id",async (req,res)=>{
    let collection=db.collection("recipes");
    const id=req.params.id;
    const query={_id: new ObjectId(id)};
    let result=await collection.findOne(query);
    res.json(result).status(200);
})
router.post("/newrecipe",async (req,res)=>{
    let collection=db.collection("recipes");
    let newRecipe=req.body;
    let result=await collection.insertOne(newRecipe);
    res.json(result).status(201);
})









export default router;





