import React from 'react'
import { useNavigate } from 'react-router-dom'
//importing stylesheet
import "../css/subjectMgnt.css"

//importing navbar
import AdminNavbar from '../components/adminNavbar/adminNavbar'

function SubjectMngt() {

    const navigate = useNavigate();

    const handleSubjMgntModifySubjects = async(e)=>{
        e.preventDefault();
        navigate("/modify-subjects")

    }

    const handleVeiwSubjects = async(e)=>{
        e.preventDefault();
        navigate("/")
    }
    return (
        <>
            <AdminNavbar/>
            <div className="subjectMgnt-mian-wrapper">
                <div className="subjectMgnt-main-container">
                    <form action="">
                        <div className="subjectMgnt-credential-year-container">
                            <p>Academic Year</p>
                            <input 
                                required="true"
                                placeholder='YYYY'
                                type="number" />
                            <span>To</span>
                            <input 
                                required="true"
                                placeholder='YYYY'
                                type="number" />
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
                            <button
                                onClick={handleSubjMgntModifySubjects}
                                >Modify Subjects</button>
                            <button
                                onClick={handleVeiwSubjects}
                                >Veiw Subjects</button>
                        </div>
                    </form>
                    
                </div>
            </div>
        </>
    )
}

export default SubjectMngt