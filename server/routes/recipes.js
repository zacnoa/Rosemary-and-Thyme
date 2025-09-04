import db from "../db/conn.js";
import express from "express";
import { ObjectId } from "mongodb";


const router=express.Router();


router.get("/", async (req,res)=>{
    let collection=  db.collection("recipes");
    let results= await collection.find({}).limit(5).toArray();
    res.send(results).status(200);

})

router.get("/search", async (req, res) => {
    try {
        let collection = db.collection("recipes");
        const query = req.query.q;
        const dbQuery = [
            {
                $search: {
                    index: "autoCompleteIndex",
                    autocomplete: {
                        query: query,
                        path: "title",
                        fuzzy:{
                            maxEdits:2,
                            prefixLength:3
                        },
                    }
                }
            },
            { $limit: 5 }
        ];
        const result = await collection.aggregate(dbQuery).toArray();
        res.status(200).json(result);
    } catch (err) {
        console.error("Search error:", err);
        res.status(500).json({ error: "Search failed", details: err.message });
    }
});




router.post("/newrecipe",async (req,res)=>{
    let collection=db.collection("recipes");
    let newRecipe=req.body;
    let result=await collection.insertOne(newRecipe);
    res.json(result).status(201);
})
router.get("/:id",async (req,res)=>{
    let collection=db.collection("recipes");
    const id=req.params.id;
    const query={_id: new ObjectId(id)};
    let result=await collection.findOne(query);
    res.json(result).status(200);
})








export default router;





