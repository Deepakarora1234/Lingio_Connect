import express from "express";
import User from "../models/user.js";

const router =express.Router();

router.post("/", async(req,res)=>{
    try{
        // console.log(req.body);
        const {auth0Id, email} = req.body;
        
     
    const user = await User.findOne({auth0Id,  email})
    if(user)
    {
        return res.status(200)

    }
    const newUser = new User(req.body)
    
    await newUser.save()
    res.status(201).json(newUser.toObject())

    }
    catch(error){
        console.log(error)
        res.status(500).json("Something went wrong in authentication")
    }
    
})

router.get("/current-user/:auth0Id", async(req, res)=>{
    try{
        const auth0Id = req.params.auth0Id
        const currentUser = await User.findOne({auth0Id})

        if(!currentUser)
            {
                return res.status(400).json({message : "User not found"})
            }
           

        res.status(201).json(currentUser)
    }
    catch(error){
        console.log(error)
        res.status(500).json({message : "Something went wrong in fetching current user"})
    }
   

})

export default router