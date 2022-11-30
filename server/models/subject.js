const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    maxCount:{
        type:Number,
        required:true
    },
    enrolledCount:{
        type:Number,
        required:true
    },
    cycle:{
        type:String,
        required:true,
        enum:['physics, chemistry']
    },
    type:{
        type:String,
        required:true,
        enum:['optional','mandatory','engineering-science']
    },
    excludedBranches:[
        {
            type:String,
            enum:['CS','AD','CV','IS','ML','BT','ME','IM','CH','EE','EC','EI','ET']
        }
    ],
    allowedBranches:[
        {
            type:String,
            enum:['CS','AD','CV','IS','ML','BT','ME','IM','CH','EE','EC','EI','ET']
        }
    ]
},{timestamps:true});

module.exports=mongoose.model("Subject",subjectSchema);