import React,{useState} from 'react'
import {useNavigate} from "react-router-dom"


//importing stylesheet
import "../css/studentMngt.css"
//importing navbar
import AdminNavbar from '../components/adminNavbar/adminNavbar'


function StudentMngt() {

    const navigate = useNavigate();

    const [branchOptionState, setbranchOptionState] = useState("NA");
    const [semisterOptionState, setsemisterOptionState] = useState("NA");

    const handleClickVeiwStudents =async (e)=>{
        e.preventDefault();
        console.log(branchOptionState);
        navigate('/veiw-students')

    }
    return (
        <>
            <AdminNavbar/>
            <div className="student-mngt-main-wrapper">
                <div className="student-mngt-main-container">
                    <form action="" className='student-mngt-form-container'>
                        <div className="student-mgnt-academic-container">
                            <label htmlFor="">Academic Year</label>
                            <input 
                                placeholder='YYYY'
                                type="number" 
                                min={2022}/>
                                <span>To</span>
                            <input 
                                placeholder='YYYY' 
                                type="number" />
                        </div>
                        <div className="student-mngt-credential-container">
                            <label htmlFor="">Branch</label>
                            <select 
                                name="" 
                                id=""
                                required="true"
                                value={branchOptionState}
                                onChange={(e)=>setbranchOptionState(e.target.value)}
                            >
                                <option value="NA">-Select-</option>
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
                            <label htmlFor="">Semister</label>
                            <select 
                                name="" 
                                id=""
                                required="true"
                                value={semisterOptionState}
                                onChange={(e)=>setsemisterOptionState(e.target.value)}
                            >
                                <option value="NA">-Select-</option>
                                <option value="1">&#8544;</option>
                                <option value="2">&#8545;</option>
                                <option value="3">&#8546;</option>
                            </select>
                        </div>
                        <div className="student-mngt-button-actions">
                            <button 
                            type='submit'
                            onClick={handleClickVeiwStudents}
                            >Veiw Students</button>
                            <button type='submit'>Veiw Passwords</button>
                        </div>
                    </form>
                    
                </div>
            </div>
        </>
    )
}

export default StudentMngt