const mongoose = require("mongoose");
//importing bcrypt for hashing password amd JWT for gernrating JWT token
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
        enum:branchCodes,
        required:true
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
            subject:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'Subject',
            },
            sem:{
                type:Number,
                enum:semesters
            }
        }
    ],
    studentRole:{
        type:Number,
        default:780907276
    }
},{timestamps:true});

//hashing the password before saving it.
// so we use pre method for the action save . then we hash it acoordingly
// studentSchema.pre("save",async function(next){
//     if(!this.isModified("password")){
//         next();
//     }
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password,salt);
//     next();
// });

// studentSchema.pre("updateOne",async function(next){
//     const currentPassword = this;
//     const res = await studentSchema.find(currentPassword.password);
//     console.log(res)
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password,salt);
//     next();
// });

//creating a admin method to verify the password is matched or not
studentSchema.methods.matchPasswords = async function(password){
    if(password === this.password){
        return true
    }
    else{
        return false
    }
    // return await bcrypt.compare(password,this.password);
}

//creating the json web token 
studentSchema.methods.getSignedToken = function(){
    var today = new Date();
    var expression = new Date(today);
    expression.setDate(today.getDate() + 60);

    return jwt.sign({
            id:this._id,
            USN:this.USN,
            expression: parseInt(expression.getTime() / 1000),},
        process.env.JWT_SECRET,
        {
        expiresIn:process.env.JWT_EXPIRE
    });
};


module.exports=mongoose.model("Student",studentSchema);