const mongoose = require("mongoose");
const {semesters} = require("../utils/constants");
const {branchCodes} = require("../utils/constants");

const studentSchema = new mongoose.Schema({
    Name:{
        type:String,
        required:true
    },
    USN:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    branch:{
        type:String,
        enum:branchCodes
    },
    academicYear:{
        type:String,
        required:true
    },
    semester:{
        type:Number,
        enum:semesters
    },
    subEnrolled:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Subject',
            sem:{
                type:Number,
                enum:semesters
            }
        }
    ]
},{timestamps:true});

module.exports=mongoose.model("Student",studentSchema);