import React,{useState,useEffect} from 'react';
import axios from "../../axios/axios";
//importing stylesheet
import "../../css/adminCss/modifySubjects.css"
//importing navbar
import AdminNavbar from '../../components/adminNavbar/adminNavbar'
import { AdminLoader } from '../../components/loading component/loader';
//importing addSubject Compnent
import 
    {
        AddESCsubject,AddCyclesubject,
        AddMDsubject,DisplayESCSubject,
        DisplayCycleSubject,DisplayMDSubject} from '../../components/Subject/subject';

function ModifySubjects() {

    const [ESCsubject,setESCsubject] = useState([]);
    const [CycleSubject,setCycleSubject] = useState([]);
    const [mandatorySubjects, setMandatorySubjects] = useState([]);

    const [addMoreEsc, setaddMoreEsc] = useState([]);
    const [isEscCreated, setisEscCreated] = useState(false);

    const [addMoreCycleCourse, setaddMoreCycleCourse] = useState([]);
    const [isCycleCourseCreated, setisCycleCourseCreated] = useState(false);

    const [addMoreMandatory, setaddMoreMandatory] = useState([]);
    const [isMdCreated, setisMdCreated] = useState(false);
    
    const [loading, setLoading] = useState(false);

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
    const handleAddMDCourse = async ()=>{
        setaddMoreMandatory([...addMoreMandatory,{MD:""}])
        if(isMdCreated){
            setisMdCreated(false);
        }
    }

    const getSubjects = async()=>{
        setLoading(true);
        const res = await axios.get("/admin/get-subjects")
                            .catch((err)=>{
                                setLoading(true);
                                console.log(err);
                                alert("Error in fetching subjects. please try again later");
                                setLoading(false);
                            });
        if(res.data.message==="successfull"){
            if(res.data.data.length===0){
                alert("No subjects found");
            }else{
                setESCsubject(res.data.data.filter((item)=>item.type==="ESC"));
                setCycleSubject(res.data.data.filter((item)=>item.type==="CYC"));
                setMandatorySubjects(res.data.data.filter((item)=>item.type==="MD"));
            }
        }
        else
            alert(res.data.message);
        setLoading(false);
    }
    
    useEffect(()=>{
        async function fetchData(){
            await getSubjects();
        }
        fetchData();
    },[])
    
    return (
        <>
            <AdminNavbar/>
            {
                loading === true && <AdminLoader/>
            }
            {
                loading === false && <div className="modifySubjects-main-wrapper">
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
                            {ESCsubject.map((key,index)=>{
                                var excludingBranchList = ""
                                for(let i=0;i<ESCsubject[index].excludedBranches.length;i++){
                                    excludingBranchList = excludingBranchList+" "+ESCsubject[index].excludedBranches[i]
                                }
                                return(
                                    <DisplayESCSubject
                                        subjectCode = {ESCsubject[index].code}
                                        subjectName={ESCsubject[index].name}
                                        maxLimit={ESCsubject[index].maxCount}
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
                            {CycleSubject.map((key,index)=>{
                                
                                return(
                                    <DisplayCycleSubject
                                        subjectCode = {CycleSubject[index].code}
                                        subjectName={CycleSubject[index].name}
                                        maxLimit={CycleSubject[index].maxCount}
                                        allocatedCycle={CycleSubject[index].cycle}
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

                    <div className="modifySubjects-part1-subjects-container">
                        <div className="modifySubjects-part1-heading-container">
                            <h3>Mandatory Courses</h3>
                        </div>
                        <div className="modifySubjects-part1-display-subjects-wrapper">
                            <div className="modifySubjects-display-label-container">
                                <div className="modifySubjects-display-subject-code-label-container">
                                    <p>Subject Code</p>
                                </div>
                                <div className="modifySubjects-display-subject-name-label-container">
                                    <p>Subject Name</p>
                                </div>
                                <div className="modifySubjects-display-subject-excluding-label-branches-container">
                                    <p>Mandated Branches</p>
                                </div>
                            </div>
                            {mandatorySubjects.map((key,index)=>{
                                var mandatedBranchList = ""
                                for(let i=0;i<mandatorySubjects[index].mandatedBranches.length;i++){
                                    mandatedBranchList = mandatedBranchList+" "+mandatorySubjects[index].mandatedBranches[i]
                                }
                                return(
                                    <DisplayMDSubject
                                        subjectCode = {mandatorySubjects[index].code}
                                        subjectName={mandatorySubjects[index].name}
                                        mandatedBranches={mandatedBranchList}
                                    />
                                )

                            })}
                        </div>
                        {
                            addMoreMandatory.map(()=>{
                                return(
                                    <AddMDsubject/>
                                )
                            })
                        }
                        <div className="modifySubjects-add-course-button-container">
                            <button
                                onClick={handleAddMDCourse}
                                >Add Course</button>
                        </div>
                        
                    </div>
                </div>
            </div>
            }
        </>
    )
}

export default ModifySubjects