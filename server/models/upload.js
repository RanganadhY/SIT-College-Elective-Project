const mongoose = require("mongoose");
const {branchCodes,semesters} = require("../utils/constants");

const studentSchema = new mongoose.Schema({
    USN:{
        type:String,
        required:true,
        unique:true
    },
    Name:{
        type:String,
        required:true
    },
    Branch:{
        type:String,
        enum:branchCodes,
        required:true
    },
    AcademicYear:{
        type:String,
        required:true
    },
    semester:{
        type:Number,
        enum:semesters,
        required:true
    }
},{timestamps:true});

module.exports=mongoose.model("Uploads",studentSchema);