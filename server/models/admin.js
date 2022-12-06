const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");


const adminSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:Number,
        default:379832798327
    },
    subjectSelection:{
        type:Boolean,
        default:false
    }
},{timestamps:true});

adminSchema.methods.matchPasswords = async function(password){
    if(password === this.password){
        return true
    }
    else{
        return false
    }
    // return await bcrypt.compare(password,this.password);
}

adminSchema.methods.getSignedToken = function(){
    var today = new Date();
    var expression = new Date(today);
    expression.setDate(today.getDate() + 60);

    return jwt.sign({
            id:this._id,
            email:this.email,
            expression: parseInt(expression.getTime() / 1000),},
        process.env.JWT_SECRET,
        {
        expiresIn:process.env.JWT_EXPIRE
    });
};




module.exports=mongoose.model("Admin",adminSchema);