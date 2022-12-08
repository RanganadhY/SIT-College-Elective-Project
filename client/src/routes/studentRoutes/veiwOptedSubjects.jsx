import React from 'react'
import axios from "../../axios/axios"
import {useLocation,useNavigate} from "react-router-dom"

// import "../../css/studentCss/veiwOptedSubjects.css"
import "../../css/studentCss/veiwOptedSubjects.css"

function VeiwOptedSubjects() {

    const navigate = useNavigate()

    const {state} = useLocation();
    console.log(state);


    const handleDone = ()=>{
        navigate('/')
    }
    return (
        <div className='veiwOptedSubjects-container'>   
            <div className="vos-mainheading">
                <h2>Veiw Your Opted Subjects</h2>
            </div>

            <div className="VeiwOptedSubjects-student-profile">
            <div className="vos-student-credential-container">
                    <p>{state.studentDetails.studentUsn}</p>
                </div>
                <div className="vos-student-name">
                    <p>{state.studentDetails.name}</p>
                    
                </div>
                <div >
                    <p>{state.studentDetails.branch}</p>
                </div>
                <div className="vos-student-credential-container">
                    <p>Semester:</p>
                    <p className='vos-student-sb'>{state.studentDetails.semester}</p>
                </div>
                <div className="vos-student-credential-container">
                    <p>Cycle:</p>
                    <p className='vos-student-sb'>{state.studentDetails.cycle}</p>
                </div>
                
            </div>
            <div className="vos-opted-subject-display">
                <table
                    width="70%"
                    className='sp-Esc-subject-table'
                >
                    
                    <thead>
                        <tr>
                            <th>Subject Code</th>
                            <th>Student Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            state.optedSubjects.map((key,index)=>{
                                return(
                                    <tr>
                                        <td>{state.optedSubjects[index].code}</td>
                                        <td>{state.optedSubjects[index].name}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
            <div className="vos-esc-save-option">
                <button
                    
                    className={'os-esc-save-button'}
                    onClick={handleDone}
                >Done</button>
            </div>
        </div>
    )
}

export default VeiwOptedSubjects