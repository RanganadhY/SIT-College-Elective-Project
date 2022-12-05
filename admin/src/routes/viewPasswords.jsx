import React, {useState} from 'react'
import { useLocation } from 'react-router-dom'
import * as XLSX from "xlsx";

import "../css/viewStudents.css"

//importing navbar
import AdminNavbar from '../components/adminNavbar/adminNavbar'

function ViewPasswords() {

    const stateData = useLocation().state;
    const [studentsList, setStudentsList] = useState(stateData.data);

    const handleDownload = async()=>{
        var fullBook = XLSX.utils.book_new(),
        fullSheet = XLSX.utils.json_to_sheet(studentsList);

        XLSX.utils.book_append_sheet(fullBook, fullSheet, "Student Passwords");
        XLSX.writeFile(fullBook, "Student Passwords.xlsx");
    }

    return (
        <>
            <AdminNavbar/>
            <div className="view-students-main-wrapper">
                <div className="view-students-main-container">
                    <div className="view-students-heading-container">
                        <h3>Passwords</h3>
                    </div>
                    <div className='view-students-buttons-action-container'>
                        <div className='view-students-strech-container'></div>
                        <div className='view-students-buttons-action-wrapper'>
                            <button onClick={handleDownload}>Download</button>
                        </div>
                        
                    </div>
                    <div className="view-students-students-display-wrapper">
                        <div className="view-students-students-display-container">
                            <div className="view-students-display-labels-container">
                                <div className='view-students-display-labels-serial-no'>
                                    <p>S.no</p>
                                </div>
                                <div className='view-students-display-labels'>
                                    <p>Student USN</p>
                                </div>
                                <div className='view-students-display-labels'>
                                    <p>Student Name</p>
                                </div>
                                <div className='view-students-display-labels'>
                                    <p>Student Password</p>
                                </div>
                            </div>
                            {studentsList && studentsList.map((key,index)=>{
                                // console.log(studentsList[index])
                                return(
                                    <div className='view-students-display-result-container'>
                                        <div className='view-students-display-result-serial-no'>
                                            <p>{index+1}</p>
                                        </div>
                                        <div className='view-students-display-usn-result'>   
                                            <input key={key} type="text" value={studentsList[index].USN}  readOnly="true"/>
                                        </div>
                                        <div className='view-students-display-result'>
                                            <input key={key} type="text" value={studentsList[index].Name} readOnly="true" />
                                        </div>
                                        <div className='view-students-display-result'>
                                            <input key={key} type="text" value={studentsList[index].password===""?"":studentsList[index].password} readOnly="true" />
                                        </div>
                                    </div>
                                )
                                    
                                
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ViewPasswords