const mongoose =require("mongoose")
const users= new mongoose.Schema(
    {
        username:{
            type:String,
            required:true
        },
        password :{
            type:String,
            required:true
        }
        },
        {timestamps: true}
)

module.exports = mongoose.model('User',users);