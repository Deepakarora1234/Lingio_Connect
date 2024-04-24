import mongoose from "mongoose";

const tutorSchema = new mongoose.Schema({
    fullName:{type:String },
    email:{type:String, required:true},
    mobileNumber : {type:String}, 
    language : {type:String}, 
    courseDuration :{type:Number},
    cost : {type : Number},
    description : {type : String},
    image:{type:String},
   

})
const Tutor = mongoose.model("Tutor", tutorSchema);

export default Tutor;