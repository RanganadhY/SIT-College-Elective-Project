import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from "../../axios/axios"

//importing stylesheet
import "../../css/adminCss/subjectMgnt.css"

//importing navbar
import AdminNavbar from '../../components/adminNavbar/adminNavbar'
import { AdminLoader } from '../../components/loading component/loader';

function SubjectMngt() {

    const navigate = useNavigate();

    const [yearStart, setYearStart] = useState(0);
    const [yearEnd, setYearEnd] = useState(0);
    const [semisterOptionState, setsemisterOptionState] = useState("NA");
    const [isLoading, setisLoading] = useState(false);

    const handleSubjMgntModifySubjects = async()=>{
        const data = {
            yearStart: yearStart,
            yearEnd: yearEnd,
            semester: parseInt(semisterOptionState)
        }
        axios.post("/admin/get-subjects", data)
        .then((res) => {
            if(res.data.message==="successfull"){
                if(res.data.data.length===0){
                    alert("No subjects found");
                }else{
                    navigate("/modify-subjects", {state: {data:res.data.data}});
                }
            }
            else
                alert(res.data.message);
        })
        .catch((err) => {
            console.log(err);
            alert("something went wrong. Please try again later");
        })
    }

    const handleviewSubjects = async()=>{
        // navigate("/")
        console.log("handleviewSubjects");
    }

    const handleSubmit=async(e)=>{
        const form = e.currentTarget;
        if(form.checkValidity() === false){
            e.preventDefault();
            e.stopPropagation();
        }else{
            e.preventDefault();
            e.stopPropagation();
            if(e.nativeEvent.submitter.value==="modify"){
                handleSubjMgntModifySubjects();
            }else if(e.nativeEvent.submitter.value==="view"){
                handleviewSubjects();
            }
        }
    }
    return (
        <>
            <AdminNavbar/>
            <div className="subjectMgnt-mian-wrapper">
                <div className="subjectMgnt-main-container">
                    <form onSubmit={handleSubmit}>
                        <div className="subjectMgnt-credential-year-container">
                            <p>Academic Year</p>
                            <input 
                                required="true"
                                placeholder='YYYY'
                                type="number" 
                                onChange={(e)=>setYearStart(e.target.value)}
                                min={2022}/>
                            <span>To</span>
                            <input 
                                required="true"
                                placeholder='YYYY'
                                type="number" 
                                onChange={(e)=>setYearEnd(e.target.value)}
                                min={parseInt(yearStart)+1}/>
                        </div>
                        <div className="subjectMgnt-credential-semester-container">
                            <p>Semester</p>
                            <select 
                                required="true"
                                name="" id="">
                                <option value="NA">-select-</option>
                                <option value="1">&#8544;</option>
                                <option value="2">&#8545;</option>
                                <option value="3">&#8546;</option>
                            </select>
                        </div>
                        <div className="subjectMgnt-credential-buttons-container">
                            <button type='submit' onClick={(e)=>e.target.value="modify"}>Modify Subjects</button>
                            <button type='submit' onClick={(e)=>e.target.value="view"}>View Subjects</button>
                        </div>
                    </form>
                    
                </div>
            </div>
        </>
    )
}

export default SubjectMngt