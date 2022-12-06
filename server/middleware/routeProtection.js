const jwt = require("jsonwebtoken");
const studentModel = require("../models/student");


//student route protection helps to verify 
//weather the student is sending the request or not
const studentRouteProtect = async (req,res,next)=>{
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        token = req.headers.authorization.split(" ")[1]
        console.log(token);
    }
    if(!token){
        return res.status(401).json({
            "message":"Not authorized to access this page",
            "status":401
        })
    }


    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        const user = await studentModel.findById(decoded.id);
        if(!user){
            // return next(new ErrorResponce("No user Found with this credentials",404));
            return res.status(401).json({
                "message":"No user Found with this credentials",
                "status":404
            })
        }
        req.user = user;
        next();

    }catch(error){
        // return next(new ErrorResponce("Not Authorized to access this page",401));
        return res.status(401).json({
            "message":"Not Authorized to access this page",
            "status":401
        })
    }
}