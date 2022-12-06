import React, {useState} from 'react'
import { useLocation } from 'react-router-dom'
import randomize from "randomatic";
import * as XLSX from "xlsx";

import "../../css/adminCss/viewStudents.css"
import axios from "../../axios/axios";
//importing navbar
import AdminNavbar from '../../components/adminNavbar/adminNavbar'

import { AdminLoader } from '../../components/loading component/loader';

function ViewStudents() {

    const stateData = useLocation().state;
    const [studentsList, setStudentsList] = useState(stateData.data);
    const [downloadEnable, setDownloadEnable] = useState(true);
    const [isLoading, setisLoading] = useState(false);

    const handleDownload = async()=>{
        setisLoading(true);
        let newList = [];
        for(let i=0;i<studentsList.length;i++){
            let temp = {
                "Student USN":studentsList[i].USN,
                "Student Name":studentsList[i].Name,
                "Student Password":studentsList[i].password
            }
            newList.push(temp);
        }
        var fullBook = XLSX.utils.book_new(),
        fullSheet = XLSX.utils.json_to_sheet(newList);

        XLSX.utils.book_append_sheet(fullBook, fullSheet, "Student Passwords");
        XLSX.writeFile(fullBook, "Student Passwords.xlsx");
        setisLoading(false);
    }

    const handleSavePassword=async(studentData)=>{
        setisLoading(true);
        const response = await axios.post("/admin/save-passwords",studentData)
                        .catch((err)=>{
                            console.log(err);
                            alert("Something Went Wrong. Please try again later");
                        });
        setisLoading(false);
        if(response.status===200 && response.data.message==="successfull"){
            setStudentsList(studentData);
            setDownloadEnable(false);
        }
        else{
            alert("Something Went Wrong. Please try again later");
        }
    }

    const handlegenratingpassword = async()=>{
        let newList = [];
        for(let i=0;i<studentsList.length;i++){
            let Obj = {
                ...studentsList[i],
                password: randomize('Aa0', 10),
                branch: stateData.branch,
                semester: stateData.semester,
                academicYear: stateData.academicYear
            }
            newList.push(Obj);
        }
        await handleSavePassword(newList);
    }
    
    return (
        <>
            <AdminNavbar/>
            {
                isLoading && <AdminLoader/>
            }
            <div className="view-students-main-wrapper">
                <div className="view-students-main-container">
                    <div className="view-students-heading-container">
                        <h3>Students</h3>
                    </div>
                    <div className='view-students-buttons-action-container'>
                        <div className='view-students-strech-container'></div>
                        <div className='view-students-buttons-action-wrapper'>
                            <button
                                onClick={handlegenratingpassword}
                                >Genrate Passwords</button>
                            <button className='download' disabled={downloadEnable} onClick={handleDownload}>Download</button>
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

export default ViewStudents