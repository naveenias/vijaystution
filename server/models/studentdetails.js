const mongoose =require("mongoose")
const studentdetails= new mongoose.Schema(
    {
        studentName:{
            type:String,
            required:true
        },
        fatherName :{
            type:String,
            required:true
        },
        class :{
            type:Number,
            required:true
        },
        fees :{
            type:Number,
            required:true
        },
        username :{
            type:String,
            required:true
        },
        password :{
            type:String,
            required:true
        },
        PhoneNo:{
            type:Number,
            required:true
        }
    }
)
module.exports = mongoose.model('StudentDetails',studentdetails);  