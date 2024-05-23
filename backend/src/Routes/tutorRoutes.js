import express from "express"
import Tutor from "../models/tutor.js"
import multer from "multer"
import cloudinary from "cloudinary";
import Stripe from "stripe"

const stripeKey = "sk_test_51P24TZSCGEvzC7HSiD39Aq7rEDsK6UAg1d5ER9dLNFY6QF0NnaB6ovPW7A0Ru1B0NWoLQVLqS5xr3MFBmPtCAqk000QWiADZNa" 

const stripe = new Stripe(stripeKey)

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
        const bookingArray= []
        const data = req.body
        // console.log(imageFile)
        const tutor = new Tutor(data)
        tutor.bookings = bookingArray
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
        const tutor = await Tutor.findById(id); 
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

router.post("/payment-intent", async(req, res)=>{
    try{
        const {tutorId, userId} = req.body

        const tutor = await Tutor.findById(tutorId)
    
        if(!tutor)
            return res.status(400).json({message: "Tutor not found"})

        const paymentIntent = await stripe.paymentIntents.create({
            amount : tutor.cost,
            currency :"inr",
            metadata:{
                tutorId,
                userId
            }
        })

        if(!paymentIntent.client_secret)
            {
                return res.status(500).json({ message: "Error creating payment intent" });

            }
        const response = {
            paymentIntentId : paymentIntent.id, 
            clientSecret : paymentIntent.client_secret.toString(),

        }
        res.status(201).json(response)
    
    }
    catch(error){
        console.log(error)
        res.status(500).json({message : "Something went wrong in creating payment intent"})
    }
   

})

router.post("/createBooking", async(req, res)=>{
    try{

        const {formData} = req.body
        const { name, email,paymentIntentId,   tutorId,userId,} = formData
        

        const paymentIntent = await stripe.paymentIntents.retrieve(
            paymentIntentId 
          );
        
          if (!paymentIntent) {
            return res.status(400).json({ message: "payment intent not found" });
          }

          if (
            paymentIntent.metadata.tutorId !== tutorId ||
            paymentIntent.metadata.userId !== userId
          ) {
            return res.status(400).json({ message: "payment intent mismatch" });
          }
    
          if (paymentIntent.status !== "succeeded") {
            return res.status(400).json({
              message: `payment intent not succeeded. Status: ${paymentIntent.status}`,
            });
          }

          const newBooking ={
            userId,
            name, 
            email
          }

          const tutor = await Tutor.findOneAndUpdate(
            { _id: tutorId },
            {
              $push: { bookings: newBooking },
            }
          );

          if (!tutor) {
            return res.status(400).json({ message: "tutor not found" });
          }


          await tutor.save();
          res.status(200).json(tutor);



    }
    catch(error){
        console.log(error)
        res.status(400).json({"message" : "Something went wrong"})
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



