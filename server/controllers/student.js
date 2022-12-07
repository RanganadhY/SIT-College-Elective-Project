const Branch = require("../models/branch");
const Student = require("../models/student");
const Subject = require("../models/subject");

var AsyncLock = require('async-lock');
var lock = new AsyncLock();

const getStudentDetails = async(req,res,next) =>{
    try{
        //get the usn from request
        const { usn } = req.body;

        //find student data from the usn
        const studentDetails = await Student.find({USN:usn}).populate("subEnrolled.subject");

        //if no student found send back empty
        if(studentDetails.length === 0)
        {
            res.status(200).send({"message":"no student found", "data":[]});
            return;
        }

        //get branch code of the student
        const branchCode = studentDetails[0].branch;

        //get the subjects studied by the student
        const studiedSubjects = studentDetails[0].subEnrolled;

        //find cycle from branch of the student
        const branchDetails = await Branch.find({code:branchCode});
        const cycle = branchDetails[0].cycle;
        //get the subject _id of the studied subjects
        let studiedSubjectsIds = []
        if(studiedSubjects.length !== 0){
            for(let i=0;i<studiedSubjects.length;i++){
                if(studiedSubjects[i].subject !== null)
                    studiedSubjectsIds.push(studiedSubjects[i].subject._id);
                else
                    studiedSubjectsIds.push(null);
            }    
        }
        //find ESC courses which are not studied by the student and use a loop to get the courses where student branch is not excluded
        const ESCCourses = await Subject.find({_id:{$nin: studiedSubjectsIds}, type:"ESC"},{_id:0,__v:0,createdAt:0,updatedAt:0,cycle:0,type:0,mandatedBranches:0});
        let availableESCCourses = [];
        for(let i=0; i<ESCCourses.length; i++){
            if(ESCCourses[i].excludedBranches.includes(branchCode))
                continue;
            else
            {
                const obj = {
                    name:ESCCourses[i].name,
                    code:ESCCourses[i].code,
                    maxCount:ESCCourses[i].maxCount,
                    enrolledCount:ESCCourses[i].enrolledCount
                }
                availableESCCourses.push(obj);
            }
        }

        //find the cycle courses not studied by the student and are applicable for the students current cycle
        const availableCYCCourses = await Subject.find({_id:{$nin: studiedSubjectsIds}, type:"CYC", cycle:cycle},{_id:0,__v:0,createdAt:0,updatedAt:0,cycle:0,type:0,mandatedBranches:0,excludedBranches:0});

        //send the applicable ESC and CYC courses of the student
        res.send({"message":"successfull","eligibleSubjects":[{"esc":availableESCCourses}, {"cyc":availableCYCCourses}],"studentProfile":{"name":studentDetails[0].Name,"branch":branchDetails[0].name,"cycle":branchDetails[0].cycle,"semester":studentDetails[0].semester,"subjectSelection":studentDetails[0].selectedSems[studentDetails[0].semester-1]}});
    }catch(err){
        //sending the error message in case something goes wrong
        console.log(err)
        res.status(400).send({"message":err.message});
    }
}

const optSubject = async(req,res,next) =>{
    try{
        //get the usn and subject code from request
        const { usn, subjectCode } = req.body;

        //find the student from usn
        const studentDetails = await Student.find({USN:usn}).populate("subEnrolled.subject");

        //if no student found send back empty
        if(studentDetails.length === 0)
        {
            res.status(200).send({"message":"no student found","code":601});
            return;
        }

        if(studentDetails[0].selectedSems[studentDetails[0].semester-1][0] === true && studentDetails[0].selectedSems[studentDetails[0].semester-1][1] === true){
            res.status(200).send({"message":"You have already registered for the subjects","code":607});
        }
        //find cycle from branch of the student
        const branchDetails = await Branch.find({code:studentDetails[0].branch});
        const cycle = branchDetails[0].cycle;

        //get the subjects studied by the student
        const studiedSubjects = studentDetails[0].subEnrolled;
        //get the subject _id of the studied subjects
        let studiedSubjectsCodes = []
        if(studiedSubjects.length !== 0){
            for(let i=0;i<studiedSubjects.length;i++){
                studiedSubjectsCodes.push(studiedSubjects[i].subject.code);
            }    
        }

        //checking if the subject has been taken already
        if(studiedSubjectsCodes.includes(subjectCode)){
            res.status(200).send({"message":"Subject already studied","code":602});
            return;
        }

        //finding the subject using the code 
        const subjectDetails = await Subject.find({code:subjectCode});

        //if not found send back error
        if(subjectDetails.length === 0){
                res.status(200).send({"message":"No subject found","code":603});
                return;
        }

        //checking if the subject is applicable for the student's cycle
        if(subjectDetails[0].type === "CYC" && subjectDetails[0].cycle !== cycle){
            res.status(200).send({"message":"Subject not applicable for your cycle","code":604});
            return;
        }

        //checking if the subject is applicable for the student's branch
        if(subjectDetails[0].type === "ESC" && subjectDetails[0].excludedBranches.includes(studentDetails[0].branch)){
            res.status(200).send({"message":"Subject not applicable for your branch","code":605});
            return;
        }

        //find the subject details from the subject code and check count and update
        lock.acquire('subject', async function() {
            if(subjectDetails[0].enrolledCount >= subjectDetails[0].maxCount){  
                res.status(200).send({"message":"Subject full","code":606});
                return;
            }
            studentDetails[0].subEnrolled.push({subject:subjectDetails[0]._id,sem:studentDetails[0].sem});
            if(studentDetails[0].selectedSems[studentDetails[0].semester-1][0] === false)
                studentDetails[0].selectedSems[studentDetails[0].semester-1][0] = true;
            else if(studentDetails[0].selectedSems[studentDetails[0].semester-1][1] === false)
                studentDetails[0].selectedSems[studentDetails[0].semester-1][1] = true;
            // else{
            //     res.status(200).send({"message":"You have already registered for the subjects","code":607});
            //     return;
            // }
            await Subject.updateOne({code:subjectCode},{enrolledCount:1+subjectDetails[0].enrolledCount});
            await studentDetails[0].save().catch(async(err) => {
                console.log(err);
                await Subject.updateOne({code:subjectCode},{$inc:{enrolledCount:-1}});
                res.status(400).send({"message":"error"});
                return;
            });
        })
        .then(function(err, ret) {
            if(err){
                res.status(400).send({"message":err.message});
                return;
            }else{
                //sending back success message
                res.status(200).send({"message":"Successfully registered","code":608});
                return;
            }
        })
    }catch(err){
        //sending the error message in case something goes wrong
        console.log(err);
        res.status(400).send({"message":err.message});
    }
}

const getRegisteredSubjects = async(req,res) =>{
    try{

        const { usn } = req.body;

        //find the student from usn
        const studentDetails = await Student.find({USN:usn}).populate("subEnrolled.subject");

        //if no student found send back empty
        if(studentDetails.length === 0)
        {
            res.status(200).send({"message":"no student found","code":601});
            return;
        }

        //compose the the studied subjects array
        let studiedSubjects = [];
        for(let i=0;i<studentDetails[0].subEnrolled.length;i++){  
            if(studentDetails[0].subEnrolled[i].subject === null){
                studiedSubjects.push({"name":"Subject Deleted","code":"Subject Deleted","sem":studentDetails[0].subEnrolled[i].sem});
                continue;
            }
            const obj = {
                name:studentDetails[0].subEnrolled[i].subject.name,
                code:studentDetails[0].subEnrolled[i].subject.code,
                sem:studentDetails[0].subEnrolled[i].sem
            }
            studiedSubjects.push(obj);
        }

        //send the studied subjects
        res.status(200).send({"message":"successfull","studiedSubjects":studiedSubjects});

    }catch(err){
        //sending the error message in case something goes wrong
        console.log(err);
        res.status(400).send({"message":err.message});
    }
}

module.exports = {getStudentDetails, optSubject, getRegisteredSubjects};