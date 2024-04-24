import express from "express"
import dotenv from 'dotenv';
dotenv.config();
import cors from "cors"
import mongoose from "mongoose"
import authRoutes from "../src/Routes/authRoutes.js"
import tutorRoutes from "./Routes/tutorRoutes.js"
import {v2 as cloudinary} from "cloudinary"

cloudinary.config({
    cloud_name:"dm3jnihfu",
    api_key:"782275286945426",
    api_secret:"WxdHbltJE_GdIRPo-Xfqx29YdUo",
})

await mongoose.connect(process.env.MONGODB_STRING).then(()=> console.log("connected to database"))
const app = express()
app.use(express.json());
app.use(express.urlencoded({extended : true}));
const corsOptions ={
    origin:'*', 
    credentials:true,            
    optionSuccessStatus:200,
 }
app.use(cors(
));



app.use("/api/auth",authRoutes)
app.use("/api/tutor", tutorRoutes)



app.listen('7000',()=>{
    console.log("server running on port 7000")
})

