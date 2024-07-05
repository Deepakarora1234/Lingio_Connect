import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    userId:{type:String,unique : true , required: true},
    email:{type:String, required:true},
    name:{type:String },
})
const reviewSchema = new mongoose.Schema({
    student:{type:String , required: true},
    rating:{type:Number, required:true},
    description:{type:String, required:true},
})

const tutorSchema = new mongoose.Schema({
    fullName:{type:String },
    email:{type:String, required:true},
    mobileNumber : {type:String}, 
    language : {type:String}, 
    courseDuration :{type:Number},
    cost : {type : Number},
    description : {type : String},
    image:{type:String},
    bookings : [bookingSchema],
    reviews :[reviewSchema]
   

})
const Tutor = mongoose.model("Tutor", tutorSchema);

export default Tutor;