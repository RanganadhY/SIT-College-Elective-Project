import React,{useState} from 'react'
import {useNavigate} from "react-router-dom"
import axios from "../../axios/axios"

//importing stylesheet
import "../../css/adminCss/studentMngt.css"
//importing navbar
import AdminNavbar from '../../components/adminNavbar/adminNavbar'

import { AdminLoader } from '../../components/loading component/loader';
import { useEffect } from 'react'

function ReportGeneration() {

    const navigate = useNavigate();

    const [yearStart, setYearStart] = useState(0);
    const [yearEnd, setYearEnd] = useState(0);
    const [branchOptionState, setbranchOptionState] = useState("NA");
    const [semisterOptionState, setsemisterOptionState] = useState("NA");
    const [subject, setSubject] = useState("NA");
    const [subjectData, setSubjectData] = useState([]);
    const [loading, setLoading] = useState(false);

    const getSubjects = async()=>{
        setLoading(true);
        setLoading(true);
        const res = await axios.get("/admin/get-present-subjects",{
                "academinYear":String(String(yearStart) + "-" + String(yearEnd).slice(2)),
                "semester":parseInt(semisterOptionState),
                "branchCode":branchOptionState
            })
            .catch((err)=>{
                setLoading(false);
                console.log(err);
            });
        if(res.data){
            console.log(res.data);
            if(res.data.message==="successfull"){
                setSubjectData(res.data.subjectData);
            }
        }
        setLoading(false);
    }

    const getReportData = async()=>{
        setLoading(true);
        const res = await axios.post("/admin/generate-report",{
                "academinYear":String(String(yearStart) + "-" + String(yearEnd).slice(2)),
                "semester":parseInt(semisterOptionState),
                "branchCode":branchOptionState,
                "subject":subject
            })
            .catch((err)=>{
                setLoading(false);
                console.log(err);
                alert("Something went wrong. Please try again later");
            });
        if(res.data){
            console.log(res.data);
            if(res.data.message==="successfull"){
                if(res.data.reportData.length===0){
                    alert("No data to show");
                }else{
                    navigate("/report",{state:{"reportData":res.data.reportData}});
                }
            }else{
                alert("Something went wrong. Please try again");
            }
        }
        setLoading(false);
    }

    const handleSubmit =async (e)=>{
        if(branchOptionState==="NA" && subject==="NA"){
            e.preventDefault();
            alert("Select either branch or subject or both to proceed");
        }else{
            const form = e.currentTarget;
            if(form.checkValidity() === false){
                e.preventDefault();
                e.stopPropagation();
            }else{
                e.preventDefault();
                e.stopPropagation();
                getReportData();
            }
        }
    }

    useEffect(()=>{
        async function fetchData(){
            await getSubjects();
        }
        fetchData();
    },[]);

    return (
        <>
            <AdminNavbar/>
            {
                loading&&<AdminLoader/>
            }
            <div className="student-mngt-main-wrapper">
                <div className="student-mngt-main-container">
                    <form action="" onSubmit={handleSubmit} className='student-mngt-form-container'>
                        <div className="student-mgnt-academic-container">
                            <label htmlFor="">Academic Year</label>
                            <input 
                                required
                                placeholder='YYYY'
                                type="number" 
                                onChange={(e)=>setYearStart(e.target.value)}
                                min={2022}/>
                                <span>To</span>
                            <input 
                                required
                                placeholder='YYYY' 
                                type="number"
                                onChange={(e)=>setYearEnd(e.target.value)}
                                min={parseInt(yearStart)+1}/>
                        </div>
                        <div className="student-mngt-credential-container">
                            <label htmlFor="branch">Branch</label>
                            <select 
                                name="branch" 
                                id=""
                                value={branchOptionState}
                                onChange={(e)=>setbranchOptionState(e.target.value)}
                            >
                                <option selected value="NA">--Select--</option>
                                <option value="AD">Artificial Intelligence & Data Science</option>
                                <option value="BT"> Biotechnology</option>
                                <option value="CH">Chemical Engineering</option>
                                <option value="CV">Civil Engineering</option>
                                <option value="CS">Computer Science and Engineering</option>
                                <option value="ML">Computer Science and Engineering(AI&ML)</option>
                                <option value="EE">Electrical and Electronics Engineering</option>
                                <option value="EC">Electronics and Communication Engineering</option>
                                <option value="EI">Electronics and Instrumentation Engineering</option>
                                <option value="ET">Electronics & Telecommunication Engineering</option>
                                <option value="IM">Industrial Engineering and Management</option>
                                <option value="IS">Information Science and Engineering</option>
                                <option value="ME">Mechanical Engineering</option>
                                
                            </select>
                        </div>
                        <div className="student-mngt-credential-container">
                            <label htmlFor="branch">Subject</label>
                            <select 
                                name="subject" 
                                id=""
                                value={subject}
                                onChange={(e)=>setSubject(e.target.value)}
                            >
                                <option selected value="NA">--Select--</option>
                                {
                                    subjectData.length!==0 && subjectData.map((sub,key)=>{
                                        // console.log(sub)
                                        return <option key={key} value={sub.code}>{sub.name}</option>
                                    })
                                }
                                
                            </select>
                        </div>
                        <div className="student-mngt-credential-container student-mngt-semister-container">
                            <label htmlFor="semester">Semester</label>
                            <select
                                name="semester" 
                                id=""
                                required
                                value={semisterOptionState}
                                onChange={(e)=>setsemisterOptionState(e.target.value)}
                            >
                                <option hidden selected value="">--Select--</option>
                                <option value="1">&#8544;</option>
                                <option value="2">&#8545;</option>
                                {/* <option value="3">&#8546;</option> */}
                            </select>
                        </div>
                        <div className="student-mngt-button-actions">
                            <button type='submit'>View Report</button>
                        </div>
                    </form>
                    
                </div>
            </div>
        </>
    )
}

export default ReportGeneration