import express from "express"
import Tutor from "../models/tutor.js"
import multer from "multer"
import cloudinary from "cloudinary";

const router = express.Router()

const storage = multer.memoryStorage();
const upload = multer({
    storage: storage, 
    limits: {
        fileSize: 100 * 1024 * 1024,
    }
});

router.post("/",upload.single("imageFile"), async(req, res)=>{
    try{
        
        // console.log(req)
        console.log(req.body)
        console.log(req.file)
        const data = req.body
        // console.log(imageFile)
        const tutor = new Tutor(data)
        await tutor.save()
        res.status(200).send(tutor)

    }
    catch(error){
        console.log(error)
        res.status(500).json("Something went wrong in adding tutor")
    }
  
})
router.get("/allTutors", async(req, res)=>{
    try{
        const tutors = await Tutor.find()
        // console.log(tutors)
        res.json(tutors)
    }
    catch(error){
        console.log(error)
        res.status(500).json({message:"Something went wrong in fetching tutors"})
    }
})
export default router



