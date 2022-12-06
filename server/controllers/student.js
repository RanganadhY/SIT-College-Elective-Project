const Branch = require("../models/branch");
const Student = require("../models/student");
const Subject = require("../models/subject");


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
        for(let i=0;i<studiedSubjects.length;i++){
            studiedSubjectsIds.push(studiedSubjects[i].subject._id);
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
        res.send({"message":"successfull","data":[{"esc":availableESCCourses}, {"cyc":availableCYCCourses}]});
    }catch(err){
        //sending the error message in case something goes wrong
        console.log(err)
        res.status(400).send({"message":err.message});
    }
}

module.exports = {getStudentDetails};