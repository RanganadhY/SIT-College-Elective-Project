const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    usn:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    branch:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Branch'
    },
    academicYear:{
        type:String,
        required:true
    },
    semester:{
        type:Number,
        enum:[1,2]
    },
    subEnrolled:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Subject',
            sem:{
                type:Number,
                enum:[1,2]
            }
        }
    ]
},{timestamps:true});

module.exports=mongoose.model("Student",studentSchema);