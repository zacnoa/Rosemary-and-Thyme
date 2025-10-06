import db from "../db/conn.js";
import express from "express";
import { Double, ObjectId } from "mongodb";
import multer from "multer"; 
import {v2 as cloudinary} from "cloudinary";
import "../loadEnvironment.js"




const  recipeFormator= async (req)=>
{
  const recipe = JSON.parse(req.body.recipe);
  const newRecipe = { ...recipe };
  try {
   

    // 1. Upload thumbnail
    let thumbnailPublicId=recipe.headerImage.publicId;
    const thumbnailFile = req.files.find(f => f.fieldname === "thumbnail");
    if (thumbnailFile) {
      if(thumbnailPublicId){
        await cloudinary.uploader.destroy(thumbnailPublicId);
      }
      thumbnailPublicId = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          { resource_type: "image" },
          (error, result) => error ? reject(error) : resolve(result.public_id)
        ).end(thumbnailFile.buffer);
      });
    }

    let ingredientsPublicId = recipe.ingredientsImage.publicId;
    const ingredientsFile = req.files.find(f => f.fieldname === "ingredients");
    if (ingredientsFile) {
      if(ingredientsPublicId){
        await cloudinary.uploader.destroy(ingredientsPublicId);
      }
      ingredientsPublicId = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          { resource_type: "image" },
          (error, result) => error ? reject(error) : resolve(result.public_id)
        ).end(ingredientsFile.buffer);
      });
    }







    // 2. Upload instruction images
    const instructionImagePublicIds = await Promise.all(
      req.files
        .filter(f => f.fieldname.startsWith("instructionImage"))
        .map(file => {
          const match = file.fieldname.match(/^instructionImage(\d+)$/);
          const index = match ? parseInt(match[1], 10) : null;
          return new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream(
              { resource_type: "image" },
              (error, result) => error
                ? reject(error)
                : resolve({ index, public_id: result.public_id })
            ).end(file.buffer);
          });
        })
    );

    // 3. Upisi public_id-ove u recipe.instructions
    instructionImagePublicIds.forEach(async ({ public_id, index }) => {
      if (index !== null && newRecipe.instructions[index]) {
        if(newRecipe.instructions[index].image.publicId)
        {
           await cloudinary.uploader.destroy(newRecipe.instructions[index].image.publicId);
        }
        newRecipe.instructions[index].image = { publicId: public_id };
      }
    });

    // 4. Upisi thumbnail public_id
    newRecipe.headerImage = { publicId: thumbnailPublicId };
    newRecipe.ingredientsImage={publicId:ingredientsPublicId};


  }catch(error){
    console.error("Error in recipeFormator:", error);
    throw error;
  }
  console.log(newRecipe);
  return newRecipe;

}














const router=express.Router();
const upload=multer({storage:multer.memoryStorage()});

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET,
});


router.get("/", async (req,res)=>{
  try{
    let collection=  db.collection("recipes");
    let results= await collection.find({}).limit(5).toArray();
    res.status(200).send(results);
  }catch(err){
    res.status(500).send({error:err.message});
  }
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




router.post("/newrecipe", upload.any(), async (req, res) => {
  const newRecipe=await recipeFormator(req);
  console.log(newRecipe);
  let collection = db.collection("recipes");
  let result = await collection.insertOne(newRecipe);
  res.status(201).json(result);
});



router.get("/:id",async (req,res)=>{
  try{
    let collection=db.collection("recipes");
    const id=req.params.id;
    const query={_id: new ObjectId(id)};
    let result=await collection.findOne(query);
    res.status(200).json(result);
  }catch(err){
    res.status(500).send({error:err.message});
  }
})



router.put("/updateRecipe/:id", upload.any(), async (req, res) => {

  const newRecipe=await recipeFormator(req);
  delete newRecipe._id;
  let collection = db.collection("recipes");
  let result = await collection.replaceOne({_id: new ObjectId(req.params.id)},newRecipe);
  res.status(200).json(result);
});


export default router;





