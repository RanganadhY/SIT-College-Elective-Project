const mongoose = require("mongoose");
const {branchCodes} = require("../utils/constants");

const subjectSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    code:{
        type:String,
        required:true,
        unique:true
    },
    maxCount:{
        type:Number,
    },
    enrolledCount:{
        type:Number,
        default:0
    },
    cycle:{
        type:String,
        enum:['physics', 'chemistry']
    },
    type:{
        type:String,
        required:true,
        enum:['CYC','MD','ESC']
    },
    excludedBranches:[
        {
            type:String,
            enum:branchCodes
        }
    ],
    mandatedBranches:[
        {
            type:String,
            enum:branchCodes
        }
    ]
},{timestamps:true});

module.exports=mongoose.model("Subject",subjectSchema);