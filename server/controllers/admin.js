const Upload = require("../models/upload");
const Branch = require("../models/branch");
const Student = require("../models/student");
const Subject = require("../models/subject");
const {branchCodes, semesters} = require("../utils/constants");

const viewStudents = async(req,res,next)=>{
    try{
        //capturing the details from the body of the request
        const { yearStart, yearEnd, branch, semester} = req.body;

        //validation if the request data is correct
        if(!yearStart ||
            !(parseInt(yearStart) >= 2022) ||
            !yearEnd ||
            !(parseInt(yearEnd) >= 2022 && parseInt(yearEnd)>parseInt(yearStart)) ||
            !branch ||
            !(branchCodes.includes(branch)) ||
            !semester ||
            !(semesters.includes(semester))
            ){
                res.status(400).send({"message":"data not valid"})
                return;
            }
        
        //forming the year string
        const year = String(yearStart + "-" + String(yearEnd).slice(2));

        //querying the database with the request parameters
        const studentDetails = await Upload.find({Branch:branch,AcademicYear:year},{_id:0,Branch:0,AcademicYear:0,semester:0}).select("Name USN");

        res.status(200).send({"message":"successfull","data":studentDetails,"semester":semester,"branch":branch,"academicYear":year});

    }catch(err){
        //sending the error message in case something goes wrong
        res.status(400).send({"message":err.message});
    }
}

const savePasswords = async(req,res,next) => {
    try{
        //capturing the details from the body of the request
        const studentData = req.body;

        //saving the students in database
        for(let i=0; i<studentData.length; i++){
            await Student.updateOne({USN:studentData[i].USN},studentData[i],{upsert:true});
        }
        //sending sucesses response
        res.send({"message":"successfull"});
    }catch(err){
        //sending the error message in case something goes wrong
        console.log(err)
        res.status(400).send({"message":err.message});
    }
}

const viewPasswords = async(req,res,next) =>{
    try{
        //capturing the details from the body of the request
        const { yearStart, yearEnd, branch, semester} = req.body;

        //validation if the request data is correct
        if(!yearStart ||
            !(parseInt(yearStart) >= 2022) ||
            !yearEnd ||
            !(parseInt(yearEnd) >= 2022 && parseInt(yearEnd)>parseInt(yearStart)) ||
            !branch ||
            !(branchCodes.includes(branch)) ||
            !semester ||
            !(semesters.includes(semester))
            ){
                res.status(400).send({"message":"data not valid"})
                return;
            }

        //forming the year string
        const year = String(yearStart + "-" + String(yearEnd).slice(2));

        //Searching data based on the request parameters
        const studentData = await Student.find({branch:branch,academicYear:year},{_id:0,branch:0,academicYear:0,semester:0,subEnrolled:0,createdAt:0,updatedAt:0,__v:0});
        
        //sending response
        res.status(200).send({"message":"successfull","data":studentData});

    }catch(err){
        //sending the error message in case something goes wrong
        console.log(err)
        res.status(400).send({"message":err.message});
    }
}

const getBranches = async(req,res,next)=>{
    try{
        //getting the branch details
        const branches = await Branch.find({},{_id:0,createdAt:0,updatedAt:0,__v:0}).select("name code cycle");

        //sending the response
        res.status(200).send({"message":"successfull","data":branches})

    }catch(err){
        //sending the error message in case something goes wrong
        console.log(err)
        res.status(400).send({"message":err.message});
    }
}

const saveBranches = async(req,res,next)=>{
    try{
        console.log("hi")
        //capturing the details from the body of the request
        const branchData = req.body;

        //saving the branches in database
        for(let i=0; i<branchData.length; i++){
            await Branch.updateOne({code:branchData[i].code},branchData[i],{upsert:true});
        }

        //sending sucesses response
        res.send({"message":"successfull"});
    }catch(err){
        //sending the error message in case something goes wrong
        console.log(err)
        res.status(400).send({"message":err.message});
    }
}

const getSubjects = async(req,res,next)=>{
    try{
        //find all subjects
        const subjectData = Subject.find({},{_id:0,createdAt:0,updatedAt:0,__v:0})
    }catch(err){
        //sending the error message in case something goes wrong
        console.log(err)
        res.status(400).send({"message":err.message});
    }
}

module.exports = {viewStudents, viewPasswords, savePasswords, getBranches, saveBranches}