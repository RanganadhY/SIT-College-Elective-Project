const sutdentModel = require("../../models/student");

const studentRegister = async (req,res,next)=>{
    const {studentUSN,password} = req.body;
    console.log(studentUSN,password);
    try{
        const user = await sutdentModel.create({
            "USN":studentUSN,
            password
        });
        console.log(user)
        sendToken(user,201,res)
        return;
    }
    catch(error){
        console.log(error)
        return res.json({
            "errorName":error.name
        })
    }
}
//Student login Route
const studentLogin = async(req,res,next)=>{

    const {studentUsn,password} = req.body;

    if(!studentUsn || !password){
        return res.status(400).json({
            "message":"Please provide the Email and password",
            "status":400
        })

    }
    try{
        const user = await sutdentModel.findOne({"USN":studentUsn}).select("+password");
        console.log(user)
        if(!user){
            return res.status(404).json({
                "message":"Invalid Credentials",
                "status":404
            })
            
        }

        const isMatch = await user.matchPasswords(password)
        if(isMatch){
            sendToken(user,200,res);
            return
        }
        return res.status(401).json({
            "message":"invalid Credentails",
            "status":401
        })
    }catch(error){
        
        return res.status(500).json({
            "message":"Some thing went wrong",
            "status":500
        })
    }
}

//sending the json wenb token 
const sendToken = (user,statusCode,res)=>{
    const token = user.getSignedToken();
    res.status(statusCode).json({
        success:true,
        token,
        "roles":user.studentRole

    })
}
module.exports.studentLogin = studentLogin;
module.exports.studentRegister = studentRegister;