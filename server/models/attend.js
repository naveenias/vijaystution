const mongoose =require("mongoose")
const attendence= new mongoose.Schema(
    {
       date:{
            type:String,
            required:true
        },
        attendencedata:{
            type:Array,
            required:true
        }
    }
)
module.exports = mongoose.model('Attendence',attendence);  