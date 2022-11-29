import React,{useState} from 'react'
import {useNavigate} from "react-router-dom"


//importing stylesheet
import "../css/studentMngt.css"
//importing navbar
import AdminNavbar from '../components/adminNavbar/adminNavbar'


function StudentMngt() {

    const navigate = useNavigate();

    const [yearStart, setYearStart] = useState(0);
    const [yearEnd, setYearEnd] = useState(0);
    const [branchOptionState, setbranchOptionState] = useState("NA");
    const [semisterOptionState, setsemisterOptionState] = useState("NA");

    const handleClickVeiwStudents =async (e)=>{
        const form = e.currentTarget;
        if(form.checkValidity() === false){
            e.preventDefault();
            e.stopPropagation();
        }else{
            e.preventDefault();
            e.stopPropagation();
            console.log(branchOptionState, semisterOptionState,e.target.value);
            // navigate(`/admin/students/${branchOptionState}/${semisterOptionState}`)
        }
    }
    return (
        <>
            <AdminNavbar/>
            <div className="student-mngt-main-wrapper">
                <div className="student-mngt-main-container">
                    <form action="" onSubmit={handleClickVeiwStudents} className='student-mngt-form-container'>
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
                                required
                                name="branch" 
                                id=""
                                value={branchOptionState}
                                onChange={(e)=>setbranchOptionState(e.target.value)}
                            >
                                <option hidden selected value="">--Select--</option>
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
                                <option value="3">&#8546;</option>
                            </select>
                        </div>
                        <div className="student-mngt-button-actions">
                            <button type='submit' onClick={(e)=>e.target.value="students"}>View Students</button>
                            <button type='submit' onClick={(e)=>e.target.value="passwords"}>View Passwords</button>
                        </div>
                    </form>
                    
                </div>
            </div>
        </>
    )
}

export default StudentMngt