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

router.get("/tutorsBasedOnSearch", async(req, res)=>{
    // console.log(req.query)

    const query = constructSearchQuery(req.query);

    const tutors = await Tutor.find(query)
    res.json(tutors)

})
router.get("/:id", async(req, res) => {
    try {
        const id = req.params.id.toString();
        const tutor = await Tutor.findById(id); // Wait for the query to execute and convert to plain JavaScript object
        res.send(tutor);
    } catch(error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong in fetching tutor by id" });
    }
});
router.post("/otherTutors", async(req, res)=>{
    try{
        const {language, id} = req.body
        const otherTutors = await Tutor.find({language : language , _id : {$ne : id} })

        res.status(200).json(otherTutors)
    }
    catch(error)
    {
        console.log(error)
        res.status(500).json({message : "Something went wrong in fetching other tutors"})
    }
})


export default router

const constructSearchQuery = (queryParams)=>{

    let constructedQuery = {}
    

        if(queryParams.language)
        {
            // console.log(queryParams.language)
            constructedQuery.language = queryParams.language
        }

        if (queryParams.duration) {
            const duration = queryParams.duration;
            if (duration === "below_4") {
                constructedQuery.courseDuration = { $lt: 4 };
            } else if (duration === "4_6") {
                constructedQuery.courseDuration = { $gte: 4, $lte: 6 };
            } else if (duration === "6_above") {
                constructedQuery.courseDuration = { $gte: 6 };
            }
        }
        if (queryParams.price) {
            const price = queryParams.price;
            if (price === "below_2000") {
                constructedQuery.cost = { $lt: 2000 };
            } else if (price === "2000_5000") {
                constructedQuery.cost = { $gte: 2000, $lte: 5000 };
            } else if (price === "5000_10000") {
                constructedQuery.cost = { $gte: 5000, $lte: 10000 };
                
            }
            else if(price === '10000_above'){
                constructedQuery.cost = {$gte:10000}
            }
                

        }

        return constructedQuery

}



