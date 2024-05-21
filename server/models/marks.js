const mongoose =require("mongoose")
const marks= new mongoose.Schema(
    {
       id:{
            type:String,
            required:true
        },
        test:{
            type:String,
            required:true
        },
        marks:{
            type:Object,
            required:true
        }
    }
)
module.exports = mongoose.model('Marks',marks);  