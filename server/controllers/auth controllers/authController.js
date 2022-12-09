const sutdentModel = require("../../models/student");
const adminModel = require("../../models/admin");

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
        if(!user){
            return res.status(404).json({
                "message":"Invalid Credential",
                "status":404
            })
            
        }

        const isMatch = await user.matchPasswords(password)
        if(isMatch){
            sendToken(user,200,res);
            return
        }
        return res.status(401).json({
            "message":"Invalid Credentails",
            "status":401
        })
    }catch(error){
        
        return res.status(500).json({
            "message":"Some thing went wrong",
            "status":500
        })
    }
}

//admin regestration route
const adminRegister = async (req,res,next)=>{
    const {email,password} = req.body;
    console.log(email,password);
    try{
        const user = await adminModel.create({
            "email":email,
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
const adminLogin = async(req,res,next)=>{

    const {email,password} = req.body;
    console.log(email,password)
    if(!email || !password){
        return res.status(400).json({
            "message":"Please provide the Email and password",
            "status":400
        })

    }
    try{
        const user = await adminModel.findOne({"email":email}).select("+password");
        if(!user){
            return res.status(404).json({
                "message":"Admin Not Present",
                "status":404
            })
            
        }

        const isMatch = await user.matchPasswords(password)
        if(isMatch){
            sendToken(user,200,res);
            return
        }
        return res.status(401).json({
            "message":"Invalid Credentails",
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
        "roles":user.role

    })
}
module.exports.studentLogin = studentLogin;
module.exports.studentRegister = studentRegister;

module.exports.adminLogin = adminLogin
module.exports.adminRegister = adminRegister;