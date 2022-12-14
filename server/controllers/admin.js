const Upload = require("../models/upload");
const Branch = require("../models/branch");
const Student = require("../models/student");
const Subject = require("../models/subject");
const Admin = require("../models/admin");
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
        const studentDetails = await Upload.find({Branch:branch,AcademicYear:year,semester:semester},{_id:0,Branch:0,AcademicYear:0,semester:0}).select("Name USN");

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
        const studentData = await Student.find({branch:branch,academicYear:year,semester:semester},{_id:0,branch:0,academicYear:0,semester:0,subEnrolled:0,createdAt:0,updatedAt:0,__v:0});
        
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
        const subjectData = await Subject.find({},{_id:0,createdAt:0,updatedAt:0,__v:0});

        //send subjects Data as response
        res.status(200).send({"message":"successfull","data":subjectData});

    }catch(err){
        //sending the error message in case something goes wrong
        console.log(err)
        res.status(400).send({"message":err.message});
    }
}

const addSubjectESC = async(req,res,next)=>{
    try{

        //capturing the details from the body of the request
        const {code, name, limit, exBranch} = req.body;

        //forming array of branches from the string
        const exBranchList = exBranch.trim().split(" ");

        //checking if all the supplied branches are valid
        for(let i=0;i<exBranchList.length;i++){
            if(!branchCodes.includes(exBranchList[i])){
                res.status(400).send({"message":"Data not valid"});
                return
            }
        }

        //making a new subject
        const newSubject = new Subject({
            name:name,
            code:code,
            maxCount:limit,
            excludedBranches:exBranchList,
            type:'ESC'
        });

        //saving the new subject
        await newSubject.save();

        //sending back response
        res.status(200).send({"message":"successfull"})

    }catch(err){
        //sending the error message in case something goes wrong
        console.log(err)
        res.status(400).send({"message":err.message});
    }
}

const editSubjectESC = async(req,res,next)=>{
    try{
        //capturing the details from the body of the request
        const {code, name, limit, exBranch} = req.body;

        //forming array of branches from the string
        const exBranchList = exBranch.trim().split(" ");
        
        //checking if all the supplied branches are valid
        for(let i=0;i<exBranchList.length;i++){
            if(!branchCodes.includes(exBranchList[i])){
                res.status(400).send({"message":"Data not valid"});
                return
            }
        }

        //updating the subject
        await Subject.updateOne({code:code},{code:code,name:name,maxCount:limit,excludedBranches:exBranchList},{upsert:true});

        //sending back response
        res.status(200).send({"message":"successfull"})

    }catch(err){
        //sending the error message in case something goes wrong
        console.log(err)
        res.status(400).send({"message":err.message});
    }
}

const deleteSubjectESC = async(req,res,next)=>{
    try{
        //capturing the details from the body of the request
        const {code, name, limit, exBranch} = req.body;

        //deleting the subject
        await Subject.deleteOne({code:code});

        //sending back response
        res.status(200).send({"message":"successfull"})

    }catch(err){
        //sending the error message in case something goes wrong
        console.log(err)
        res.status(400).send({"message":err.message});
    }
}

const addSubjectCYC = async(req,res,next)=>{
    try{
        //capturing the details from the body of the request
        const {code, name, limit, cycle} = req.body;

        //checking if cycle is valid
        if(cycle.trim()!=="physics" && cycle.trim()!=="chemistry"){
            res.status(400).send({"message":"data not valid"});
            return
        }

        //making a new subject
        const newSubject = new Subject({
            name:name,
            code:code,
            maxCount:limit,
            cycle:cycle,
            type:'CYC'
        });

        //saving the new subject
        await newSubject.save();

        //sending back response
        res.status(200).send({"message":"successfull"})

    }catch(err){
        //sending the error message in case something goes wrong
        console.log(err)
        res.status(400).send({"message":err.message});
    }
}

const editSubjectCYC = async(req,res,next)=>{
    try{
        //capturing the details from the body of the request
        const {code, name, limit, cycle} = req.body;

        //checking if cycle is valid
        if(cycle.trim()!=="physics" && cycle.trim()!=="chemistry"){
            res.status(400).send({"message":"data not valid"});
            return
        }

        //updating the subject
        await Subject.updateOne({code:code},{code:code,name:name,maxCount:limit,cycle:cycle},{upsert:true});

        //sending back response
        res.status(200).send({"message":"successfull"})

    }catch(err){
        //sending the error message in case something goes wrong
        console.log(err)
        res.status(400).send({"message":err.message});
    }
}

const deleteSubjectCYC = async(req,res,next)=>{
    try{
        //capturing the details from the body of the request
        const {code, name, limit, cycle} = req.body;

        //deleting the subject
        await Subject.deleteOne({code:code});

        //sending back response
        res.status(200).send({"message":"successfull"})

    }catch(err){
        //sending the error message in case something goes wrong
        console.log(err)
        res.status(400).send({"message":err.message});
    }
}


const addSubjectMD = async(req,res,next)=>{
    try{
        //capturing the details from the body of the request
        const {code, name, mandatedBranch} = req.body;

        //forming array of branches from the string
        const mdBranchList = mandatedBranch.trim().split(" ");
        
        //checking if all the supplied branches are valid
        for(let i=0;i<mdBranchList.length;i++){
            if(!branchCodes.includes(mdBranchList[i])){
                res.status(400).send({"message":"Data not valid"});
                return
            }
        }

        //making a new subject
        const newSubject = new Subject({
            name:name,
            code:code,
            mandatedBranches:mdBranchList,
            type:'MD'
        });

        //saving the new subject
        await newSubject.save();

        //sending back response
        res.status(200).send({"message":"successfull"})

    }catch(err){
        //sending the error message in case something goes wrong
        console.log(err)
        res.status(400).send({"message":err.message});
    }
}

const editSubjectMD = async(req,res,next)=>{
    try{
        //capturing the details from the body of the request
        const {code, name, mandatedBranch} = req.body;

        //forming array of branches from the string
        const mdBranchList = mandatedBranch.trim().split(" ");
        
        //checking if all the supplied branches are valid
        for(let i=0;i<mdBranchList.length;i++){
            if(!branchCodes.includes(mdBranchList[i])){
                res.status(400).send({"message":"Data not valid"});
                return
            }
        }

        //updating the subject
        await Subject.updateOne({code:code},{code:code,name:name,mandatedBranches:mdBranchList},{upsert:true});

        //sending back response
        res.status(200).send({"message":"successfull"})

    }catch(err){
        //sending the error message in case something goes wrong
        console.log(err)
        res.status(400).send({"message":err.message});
    }
}

const deleteSubjectMD = async(req,res,next)=>{
    try{
        //capturing the details from the body of the request
        const {code, name, mdBranches} = req.body;

        //deleting the subject
        await Subject.deleteOne({code:code});

        //sending back response
        res.status(200).send({"message":"successfull"})

    }catch(err){
        //sending the error message in case something goes wrong
        console.log(err)
        res.status(400).send({"message":err.message});
    }
}

const getStatus = async(req,res,next)=>{

    try{
        //get the status from admin model
        const adminDetails = await Admin.find({});

        //if no admin is found
        if(adminDetails.length===0){
            res.status(400).send({"message":"no admin found"});
            return
        }
        const status = adminDetails[0].subjectSelection;

        //send the status
        res.status(200).send({"message":"successfull","status":status});
    }catch(err){
        //sending the error message in case something goes wrong
        console.log(err)
        res.status(400).send({"message":err.message});
    }
}

const setStatus = async(req,res,next)=>{

    try{
        //get the status value from req
        const {status} = req.body;

        //update the status
        await Admin.updateMany({},{subjectSelection:status});

        //send the response
        res.status(200).send({"message":"successfull"});

    }catch(err){
        //sending the error message in case something goes wrong
        console.log(err)
        res.status(400).send({"message":err.message});
    }
}

const getSubjectsStatus = async (req,res,next)=>{

    try{
        //get the codes from body
        const {eligibleSubjectCodes} = req.body;
        // eligibleSubjectCodes = JSON.parse(eligibleSubjectCodes);
        //get the subjects enrolled count from the database

        const subjects = await Subject.find({code:{$in:eligibleSubjectCodes}},{_id:0,__v:0,createdAt:0,updatedAt:0,cycle:0,type:0,mandatedBranches:0,excludedBranches:0});

        //send the response
        res.status(200).send({"message":"successfull","subjectsCount":subjects});
    }catch(err){
        //sending the error message in case something goes wrong
        console.log(err)
        res.status(400).send({"message":err.message});
    }
}

const generateReport = async(req,res,next)=>{
    try{
        const {academinYear, semester, branchCode, subject} = req.body;
        if(
            !semester ||
            !(semesters.includes(semester)) ||
            !academinYear
            // !(branchCode==="NA" && subject==="NA")
        )
        {
            res.status(400).send({"message":"data not valid"})
            return;
        }
        let studentDetails=[];
        //case 1
        if(branchCode && subject==="NA"){
            //get student data from the database
            studentDetails = await Student.find({branch:branchCode, academicYear:academinYear, semester:semester}).populate("subEnrolled.subject").sort({USN:1});
        }
        //case 2
        else if(branchCode==="NA" && subject){
            const students = await Student.find({academicYear:academinYear, semester:semester}).populate("subEnrolled.subject").sort({USN:1});
            students.forEach((student)=>{
                for(let i=0; i<student.subEnrolled.length; i++){
                    if(student.subEnrolled[i].subject.code===subject){
                        studentDetails.push(student);
                    }
                }
            });
        }
        //case 3
        else if(branchCode && subject){
            const students = await Student.find({branch:branchCode, academicYear:academinYear, semester:semester}).populate("subEnrolled.subject").sort({USN:1});
            students.forEach((student)=>{
                for(let i=0; i<student.subEnrolled.length; i++){
                    if(student.subEnrolled[i].subject.code===subject){
                        studentDetails.push(student);
                    }
                }
            });
        }
        //consolidate the data
        let reportData = [];
        for(let i=0; i<studentDetails.length; i++){
            const branchDetails = await Branch.find({code:studentDetails[i].branch});
            let studentObj = {
                "usn":studentDetails[i].USN,
                "name":studentDetails[i].Name,
                "branch":studentDetails[i].branch,
                "semester":studentDetails[i].semester,
                "academicYear":studentDetails[i].academicYear,
                "cycle": branchDetails[0].cycle,
                "ESC":studentDetails[i].subEnrolled.filter((sub)=>sub.subject.type==="ESC").map((sub)=>sub.subject.name).join(","),
                "CYC":studentDetails[i].subEnrolled.filter((sub)=>sub.subject.type==="CYC").map((sub)=>sub.subject.name).join(","),
            };
            reportData.push(studentObj);
        }
        res.send({"message":"successfull","reportData":reportData});

    }catch(err){
        //sending the error message in case something goes wrong
        console.log(err)
        res.status(400).send({"message":err.message});
    }
}

const upgradeSem = async(req,res,next)=>{
    try{
        //get data from request
        const { academicYear, semester} = req.body;

        //check for validity
        if(
            !semester ||
            !(semesters.includes(semester)) ||
            !academicYear
        ){
            res.status(400).send({"message":"data not valid"})
            return;
        }
        //update student db 
        await Student.updateMany({academicYear:academicYear,semester:semester});

        //send result
        res.status(200).send({"message":"successfull"});

    }catch(err){
        //sending the error message in case something goes wrong
        console.log(err)
        res.status(400).send({"message":err.message});
    }
}

const getPresentSubjects = async(req,res,next)=>{
    try{
        const subjects = await Subject.find({},{_id:0,__v:0,createdAt:0,updatedAt:0,cycle:0,type:0,mandatedBranches:0,excludedBranches:0,maxCount:0,enrolledCount:0});
        res.send({"message":"successfull","subjectData":subjects});
    }catch(err){
        //sending the error message in case something goes wrong
        console.log(err)
        res.status(400).send({"message":err.message});
    }
}
module.exports = {
    viewStudents, 
    viewPasswords, 
    savePasswords, 
    getBranches, 
    saveBranches, 
    getSubjects, 
    addSubjectESC, 
    editSubjectESC, 
    deleteSubjectESC, 
    addSubjectCYC, 
    editSubjectCYC, 
    deleteSubjectCYC, 
    addSubjectMD, 
    editSubjectMD, 
    deleteSubjectMD,
    getStatus,
    setStatus,
    getSubjectsStatus,
    generateReport,
    upgradeSem,
    getPresentSubjects
}