const mongoose = require("mongoose");

const branchSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    cycle:{
        type:String,
        enum:['physics','chemistry'],
        required:true
    },
    strength:{
        type:Number
    }
},{timestamps:true});

module.exports=mongoose.model("Branch",branchSchema);