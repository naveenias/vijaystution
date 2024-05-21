const mongoose =require("mongoose")
const teacherdetails= new mongoose.Schema(
    {
        teacherName:{
            type:String,
            required:true
        },
        
        salary :{
            type:Number,
            required:true
        },
        PhoneNo:{
            type:Number,
            required:true
        }
    }
)
module.exports = mongoose.model('teacherdetails',teacherdetails);  