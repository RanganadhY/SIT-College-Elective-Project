import React from 'react'
import {NavLink,Link, useNavigate} from "react-router-dom"

//importing stylesheet
import "../adminNavbar/adminnavbar.css"

import axios from "../../axios/axios";

function AdminNavbar() {

    const navigate = useNavigate();

    let status;

    const getSubjectSelectionStatus = async() => {
        
        const res = await axios.get("/admin/get-status")
                                .catch((err)=>{
                                    console.log(err);
                                    alert("something went wrong. Please try again later.");
                                });
        if(res.data){
            if(res.data.message === "successfull"){
                navigate("/selection-enable-disable",{state:{status:res.data.status}})
                status=res.data.status;
            }else{
                alert(res.data.message)
            }
        }
    }

    return (
        <>
            <div className="adminNavabar-main-conatiner">
                <div className="adminNavbar-collage-heading">
                    <h2>Siddaganga Institute Of Technology</h2>
                </div>
                <ul className='adminnavbar-navlink-list'>
                    <li><NavLink to="/student-management">Student Mgmt</NavLink></li>
                    <li><NavLink to="/modify-subjects">Subject Mgmt</NavLink></li>
                    <li><NavLink to="/mapping">Mapping</NavLink></li>
                    <li><NavLink to="/report">Report</NavLink></li>
                    <li onClick={getSubjectSelectionStatus}> <a>Settings</a></li>
                </ul>
            </div>
            
        </>
    )
}

export default AdminNavbar