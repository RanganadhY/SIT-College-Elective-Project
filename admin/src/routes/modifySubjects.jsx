import React,{useState,useEffect} from 'react'
//importing stylesheet
import "../css/modifySubjects.css"
//importing navbar
import AdminNavbar from '../components/adminNavbar/adminNavbar'
//importing addSubject Compnent
import 
    {
        AddESCsubject,AddCyclesubject,
        DisplayESCSubject,DisplayCycleSubject} from '../components/Subject/subject';

const engineeringSciencessubjects=[
    {
        'subjectCode':"code1",
        "subjectName":"Subject 1",
        "maxLimit":120,
        "execludingBranches":["EC","CV"]
    },
    {
        'subjectCode':"code2",
        "subjectName":"Subject 2",
        "maxLimit":240,
        "execludingBranches":["EE"]
    },
    {
        'subjectCode':"code3",
        "subjectName":"Subject 3",
        "maxLimit":60,
        "execludingBranches":["CV"]
    },
    {
        'subjectCode':"code4",
        "subjectName":"Subject 4",
        "maxLimit":240,
        "execludingBranches":["ME","IM","CH"]
    },
    {
        'subjectCode':"code5",
        "subjectName":"Subject 5",
        "maxLimit":60,
        "execludingBranches":["CS","IS","AD","BT"]
    }

]

const cycleSubjects = [
    {
        "subjectCode":"code1",
        "subjectName":"Subject Name 1",
        "allocatedCycle":"P",
        "maxLimit":240,

    },
    {
        "subjectCode":"code2",
        "subjectName":"Subject Name 2",
        "allocatedCycle":"P",
        "maxLimit":140,
        
    },
    {
        "subjectCode":"code3",
        "subjectName":"Subject Name 4",
        "allocatedCycle":"C",
        "maxLimit":240,
        
    },
    {
        "subjectCode":"code4",
        "subjectName":"Subject Name 2",
        "allocatedCycle":"C",
        "maxLimit":60,
        
    },
]
function ModifySubjects() {
    const [addMoreEsc, setaddMoreEsc] = useState([]);
    const [isEscCreated, setisEscCreated] = useState(false);

    const [addMoreCycleCourse, setaddMoreCycleCourse] = useState([]);
    const [isCycleCourseCreated, setisCycleCourseCreated] = useState(false);
    

    const handleAddEscCourse = async ()=>{
        setaddMoreEsc([...addMoreEsc,{ESC:""}])
        if(isEscCreated){
            setisEscCreated(false);
        }
    }
    const handleAddCycleCourse = async ()=>{
        setaddMoreCycleCourse([...addMoreCycleCourse,{CYCLE:""}])
        if(isCycleCourseCreated){
            setisCycleCourseCreated(false);
        }
    }
    
    
    return (
        <>
            <AdminNavbar/>
            <div className="modifySubjects-main-wrapper">
                <div className="modifySubjects-main-container">


                    <div className="modifySubjects-part1-subjects-container">
                        <div className="modifySubjects-part1-heading-container">
                            <h3>Engineering Sciences Courses</h3>
                        </div>
                        <div className="modifySubjects-part1-display-subjects-wrapper">
                            <div className="modifySubjects-display-label-container">
                                <div className="modifySubjects-display-subject-code-label-container">
                                    <p>Subject Code</p>
                                </div>
                                <div className="modifySubjects-display-subject-name-label-container">
                                    <p>Subject Name</p>
                                </div>
                                <div className="modifySubjects-display-subject-limit-label-container">
                                    <p>Max Limit</p>
                                </div>
                                <div className="modifySubjects-display-subject-excluding-label-branches-container">
                                    <p>Excluding Branches</p>
                                </div>
                            </div>
                            {engineeringSciencessubjects.map((key,index)=>{
                                var excludingBranchList = ""
                                for(let i=0;i<engineeringSciencessubjects[index].execludingBranches.length;i++){
                                    excludingBranchList = excludingBranchList+" "+engineeringSciencessubjects[index].execludingBranches[i]
                                }
                                return(
                                    <DisplayESCSubject
                                        subjectCode = {engineeringSciencessubjects[index].subjectCode}
                                        subjectName={engineeringSciencessubjects[index].subjectName}
                                        maxLimit={engineeringSciencessubjects[index].maxLimit}
                                        execludingBranches={excludingBranchList}
                                    />
                                )

                            })}
                        </div>
                        {
                            addMoreEsc.map(()=>{
                                return(
                                    <AddESCsubject/>
                                )
                            })
                        }
                        <div className="modifySubjects-add-course-button-container">
                            <button
                                onClick={handleAddEscCourse}
                                >Add Course</button>
                        </div>
                        
                    </div>


                    <div className="modifySubjects-part2-subjects-container">
                        <div className="modifySubjects-part2-heading-container">
                            <h3>Elective Courses</h3>
                        </div>
                        
                        <div className="modifySubjects-part2-display-subjects-wrapper">
                            <div className="modifySubjects-display-label-container">
                                <div className="modifySubjects-display-subject-code-label-container">
                                    <p>Subject Code</p>
                                </div>
                                <div className="modifySubjects-display-subject-name-label-container">
                                    <p>Subject Name</p>
                                </div>
                                <div className="modifySubjects-display-subject-limit-label-container">
                                    <p>Max Limit</p>
                                </div>
                                <div className="modifySubjects-display-subject-cycle-label-container">
                                    <p>Cycle</p>
                                </div>
                            </div>
                            {cycleSubjects.map((key,index)=>{
                                
                                return(
                                    <DisplayCycleSubject
                                        subjectCode = {cycleSubjects[index].subjectCode}
                                        subjectName={cycleSubjects[index].subjectName}
                                        maxLimit={cycleSubjects[index].maxLimit}
                                        allocatedCycle={cycleSubjects[index].allocatedCycle}
                                    />
                                )

                            })}
                        </div>
                        {
                            addMoreCycleCourse.map(()=>{
                                return(
                                    <AddCyclesubject/>
                                )
                            })
                        }
                        <div className="modifySubjects-add-course-button-container">
                            <button
                                onClick={handleAddCycleCourse}
                                >Add Course</button>
                        </div>
                        
                    </div>  
                </div>
            </div>
        </>
    )
}

export default ModifySubjects