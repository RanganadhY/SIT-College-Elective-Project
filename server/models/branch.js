const mongoose = require("mongoose");
const {branchCodes} = require("../utils/constants");

const branchSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    code:{
        type:String,
        enum:branchCodes,
        required:true,
        unique:true
    },
    cycle:{
        type:String,
        enum:['physics','chemistry'],
        required:true
    },
    strength:{
        type:Number,
        required:true
    }
},{timestamps:true});

module.exports=mongoose.model("Branch",branchSchema);